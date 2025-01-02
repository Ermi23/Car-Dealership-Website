import { useState } from 'react'
import Layout from '../components/layout';

interface Car {
    id: number
    make: string
    model: string
    year: number
}

const initialCars: Car[] = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
]

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>(initialCars)
    const [isOpen, setIsOpen] = useState(false)
    const [currentCar, setCurrentCar] = useState<Car>({ id: 0, make: '', model: '', year: 0 })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (currentCar.id === 0) {
            setCars([...cars, { ...currentCar, id: cars.length + 1 }])
        } else {
            setCars(cars.map(car => car.id === currentCar.id ? currentCar : car))
        }
        setIsOpen(false)
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">Cars</h2>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => {
                            setIsOpen(true)
                            setCurrentCar({ id: 0, make: '', model: '', year: 0 })
                        }}
                    >
                        Add Car
                    </button>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                            <h3 className="text-xl font-bold mb-4">
                                {currentCar.id === 0 ? 'Add Car' : 'Edit Car'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {currentCar.id === 0 ? 'Add a new car here.' : 'Edit the car details here.'}
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="make" className="block text-sm font-medium">
                                            Make
                                        </label>
                                        <input
                                            id="make"
                                            type="text"
                                            value={currentCar.make}
                                            onChange={(e) =>
                                                setCurrentCar({ ...currentCar, make: e.target.value })
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="model" className="block text-sm font-medium">
                                            Model
                                        </label>
                                        <input
                                            id="model"
                                            type="text"
                                            value={currentCar.model}
                                            onChange={(e) =>
                                                setCurrentCar({ ...currentCar, model: e.target.value })
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="year" className="block text-sm font-medium">
                                            Year
                                        </label>
                                        <input
                                            id="year"
                                            type="number"
                                            value={currentCar.year}
                                            onChange={(e) =>
                                                setCurrentCar({ ...currentCar, year: parseInt(e.target.value) })
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Make</th>
                            <th className="border border-gray-300 px-4 py-2">Model</th>
                            <th className="border border-gray-300 px-4 py-2">Year</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{car.make}</td>
                                <td className="border border-gray-300 px-4 py-2">{car.model}</td>
                                <td className="border border-gray-300 px-4 py-2">{car.year}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline mr-2"
                                        onClick={() => {
                                            setIsOpen(true)
                                            setCurrentCar(car)
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() =>
                                            setCars(cars.filter(c => c.id !== car.id))
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>

    )
}
