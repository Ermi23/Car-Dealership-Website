"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, X } from "lucide-react"
import apiClient from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define types for our dropdown options
type OptionType = {
    id: number
    name: string
}

// Form schema
const carFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    vehicle_model_id: z.coerce.number().positive(),
    type_id: z.coerce.number().positive(),
    drive_type_id: z.coerce.number().positive(),
    fuel_type_id: z.coerce.number().positive(),
    transmission_id: z.coerce.number().positive(),
    cylinder_id: z.coerce.number().positive(),
    car_status_id: z.coerce.number().positive(),
    door: z.coerce.number().int().positive(),
    mileage: z.coerce.number().nonnegative(),
    price: z.coerce.number().positive(),
    color: z.string().min(1, { message: "Color is required." }),
    year: z.coerce
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear() + 1),
    sold: z.boolean().default(false),
    feature_ad: z.boolean().default(false),
    features: z.array(z.number()).default([]),
    safety_features: z.array(z.number()).default([]),
})

type CarFormValues = z.infer<typeof carFormSchema>

export default function CreateCarPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'basic' | 'specs' | 'features'>('basic')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])

    // State for dropdown options
    const [vehicleModels, setVehicleModels] = useState<OptionType[]>([])
    const [types, setTypes] = useState<OptionType[]>([])
    const [driveTypes, setDriveTypes] = useState<OptionType[]>([])
    const [fuelTypes, setFuelTypes] = useState<OptionType[]>([])
    const [transmissions, setTransmissions] = useState<OptionType[]>([])
    const [cylinders, setCylinders] = useState<OptionType[]>([])
    const [carStatuses, setCarStatuses] = useState<OptionType[]>([])
    const [features, setFeatures] = useState<OptionType[]>([])
    const [safetyFeatures, setSafetyFeatures] = useState<OptionType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<CarFormValues>({
        resolver: zodResolver(carFormSchema),
        defaultValues: {
            name: "",
            door: 4,
            mileage: 0,
            price: 0,
            color: "",
            year: new Date().getFullYear(),
            sold: false,
            feature_ad: false,
            features: [],
            safety_features: [],
        }
    })

    // Fetch all dropdown options on component mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setIsLoading(true)

                const [
                    vehicleModelsRes,
                    typesRes,
                    driveTypesRes,
                    fuelTypesRes,
                    transmissionsRes,
                    cylindersRes,
                    carStatusesRes,
                    featuresRes,
                    safetyFeaturesRes,
                ] = await Promise.all([
                    apiClient.get("/vehicle-models"),
                    apiClient.get("/types"),
                    apiClient.get("/drive-types"),
                    apiClient.get("/fuel-types"),
                    apiClient.get("/transmissions"),
                    apiClient.get("/cylinders"),
                    apiClient.get("/car-statuses"),
                    apiClient.get("/features"),
                    apiClient.get("/safety-features"),
                ])

                // Access the data property of the response and handle potential undefined
                setVehicleModels(vehicleModelsRes.data.data || [])
                setTypes(typesRes.data.data || [])
                setDriveTypes(driveTypesRes.data.data || [])
                setFuelTypes(fuelTypesRes.data.data || [])
                setTransmissions(transmissionsRes.data.data || [])
                setCylinders(cylindersRes.data.data || [])
                setCarStatuses(carStatusesRes.data.data || [])
                setFeatures(featuresRes.data.data || [])
                setSafetyFeatures(safetyFeaturesRes.data.data || [])

            } catch (error) {
                console.error("Error fetching options:", error)
                toast.error("Failed to load form options. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchOptions()
    }, [])

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)

            // Limit to 5 images total
            const totalImages = [...images, ...newFiles].slice(0, 5)
            setImages(totalImages)

            // Create preview URLs
            const newPreviewUrls = totalImages.map((file) => URL.createObjectURL(file))
            setImagePreviewUrls(newPreviewUrls)
        }
    }

    // Remove image
    const removeImage = (index: number) => {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages)

        const updatedPreviewUrls = [...imagePreviewUrls]
        URL.revokeObjectURL(updatedPreviewUrls[index])
        updatedPreviewUrls.splice(index, 1)
        setImagePreviewUrls(updatedPreviewUrls)
    }

    // Handle form submission
    async function onSubmit(data: CarFormValues) {
        try {
            setIsSubmitting(true)
            const formData = new FormData()

            // Handle basic form fields
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'sold' || key === 'feature_ad') {
                    // Convert boolean to 1 or 0
                    formData.append(key, value ? '1' : '0')
                } else if (key !== 'features' && key !== 'safety_features' && key !== 'images') {
                    formData.append(key, value.toString())
                }
            })

            // Handle features and safety features as arrays
            if (data.features.length > 0) {
                data.features.forEach(featureId => {
                    formData.append('features[]', featureId.toString())
                })
            } else {
                formData.append('features[]', '') // Send empty array if no features selected
            }

            if (data.safety_features.length > 0) {
                data.safety_features.forEach(featureId => {
                    formData.append('safety_features[]', featureId.toString())
                })
            } else {
                formData.append('safety_features[]', '') // Send empty array if no safety features selected
            }

            // Handle images
            if (images.length > 0) {
                images.forEach((image) => {
                    formData.append('images[]', image)
                })
            } else {
                formData.append('images[]', '') // Send empty array if no images
            }

            const response = await apiClient.post("/car-details", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.success("Car has been created successfully!")
            navigate(`/cars/${response.data.id}`)
        } catch (error: any) {
            console.error("Error submitting form:", error)
            if (error.response?.data?.errors) {
                Object.values(error.response.data.errors).forEach((errorMsg: any) => {
                    toast.error(errorMsg[0])
                })
            } else {
                toast.error("Failed to create car. Please try again.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Toggle feature selection
    const toggleFeature = (id: number, type: "features" | "safety_features") => {
        const currentValues = form.getValues(type) || [] // Add fallback empty array
        let updatedValues: number[]

        if (currentValues.includes(id)) {
            updatedValues = currentValues.filter(item => item !== id)
        } else {
            updatedValues = [...currentValues, id]
        }

        form.setValue(type, updatedValues)
        // Force form to rerender
        form.trigger(type)
    }

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                {/* <Loader2 className="h-8 w-8 animate-spin text-primary" /> */}
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
                </div>
                <span className="ml-2 text-lg">Loading form options...</span>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Add New Car</h1>

            {/* Tab Navigation */}
            <div className="flex border-b mb-6">
                <button
                    className={`px-4 py-2 ${activeTab === 'basic' ? 'border-b-2 border-orange-500' : ''}`}
                    onClick={() => setActiveTab('basic')}
                >
                    Basic Information
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'specs' ? 'border-b-2 border-orange-500' : ''}`}
                    onClick={() => setActiveTab('specs')}
                >
                    Specifications
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'features' ? 'border-b-2 border-orange-500' : ''}`}
                    onClick={() => setActiveTab('features')}
                >
                    Features & Images
                </button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information Tab */}
                {activeTab === 'basic' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Car Name
                                </label>
                                <input
                                    type="text"
                                    {...form.register("name")}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Toyota Camry"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Model
                                </label>
                                <select
                                    {...form.register("vehicle_model_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select model</option>
                                    {vehicleModels.map(model => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.vehicle_model_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.vehicle_model_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Car Type
                                </label>
                                <select
                                    {...form.register("type_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select type</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.type_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.type_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    {...form.register("year")}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {form.formState.errors.year && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.year.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...form.register("price")}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {form.formState.errors.price && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    {...form.register("color")}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Red"
                                />
                                {form.formState.errors.color && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.color.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sold
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        {...form.register("sold")}
                                        className="w-6 h-6 mr-2" // Increased size and added margin right
                                    />
                                    {/* <span className="text-sm font-medium text-gray-700">
                                        Sold
                                    </span> */}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Feature Advertisement
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        {...form.register("feature_ad")}
                                        className="w-6 h-6 mr-2" // Increased size and added margin right
                                    />
                                    {/* <span className="text-sm font-medium text-gray-700">
                                        Feature Advertisement
                                    </span> */}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Car Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Drive Type
                                </label>
                                <select
                                    {...form.register("drive_type_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select drive type</option>
                                    {driveTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.drive_type_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.drive_type_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fuel Type
                                </label>
                                <select
                                    {...form.register("fuel_type_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select fuel type</option>
                                    {fuelTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.fuel_type_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.fuel_type_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Transmission
                                </label>
                                <select
                                    {...form.register("transmission_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select transmission</option>
                                    {transmissions.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.transmission_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.transmission_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cylinder
                                </label>
                                <select
                                    {...form.register("cylinder_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select cylinder</option>
                                    {cylinders.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.cylinder_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.cylinder_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Car Status
                                </label>
                                <select
                                    {...form.register("car_status_id")}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select status</option>
                                    {carStatuses.map(status => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.car_status_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.car_status_id.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of Doors
                                </label>
                                <input
                                    type="number"
                                    {...form.register("door")}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {form.formState.errors.door && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.door.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mileage
                                </label>
                                <input
                                    type="number"
                                    {...form.register("mileage")}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {form.formState.errors.mileage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.mileage.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Features & Images Tab */}
                {activeTab === 'features' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Features & Images</h2>
                        <div>
                            <h3 className="text-lg font-medium mb-3">Car Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {features.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer 
                                            ${(form.watch("features") || []).includes(feature.id)
                                                ? "bg-orange-50 border-orange-500"
                                                : "border-gray-200"}`}
                                        onClick={() => toggleFeature(feature.id, "features")}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(form.watch("features") || []).includes(feature.id)}
                                            onChange={() => toggleFeature(feature.id, "features")}
                                            className="cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <span className="select-none">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        <div>
                            <h3 className="text-lg font-medium mb-3">Safety Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {safetyFeatures.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer 
                                            ${(form.watch("safety_features") || []).includes(feature.id)
                                                ? "bg-orange-50 border-orange-500"
                                                : "border-gray-200"}`}
                                        onClick={() => toggleFeature(feature.id, "safety_features")}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(form.watch("safety_features") || []).includes(feature.id)}
                                            onChange={() => toggleFeature(feature.id, "safety_features")}
                                            className="cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <span className="select-none">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        <div>
                            <h3 className="text-lg font-medium mb-3">Car Images</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Upload up to 5 images. The first image will be used as the primary image.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                                {imagePreviewUrls.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={url || "/placeholder.svg"}
                                            alt={`Car image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                                                Primary
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {imagePreviewUrls.length < 5 && (
                                    <label className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed cursor-pointer hover:bg-muted/50">
                                        <div className="flex flex-col items-center justify-center p-4">
                                            <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">Add Image</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            multiple={true}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    {activeTab === 'features' ? (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Add Car'}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                if (activeTab === 'basic') setActiveTab('specs')
                                if (activeTab === 'specs') setActiveTab('features')
                            }}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Next
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

