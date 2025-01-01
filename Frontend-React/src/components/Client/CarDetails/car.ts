export interface CarImage {
    id: number
    car_detail_id: number
    image_url: string
    is_primary: number
    created_at: string
    updated_at: string
  }
  
  export interface Feature {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
  }
  
  export interface CarDetails {
    id: number
    name: string
    type: {
      id: number
      name: string
      description: string
    }
    drive_type: {
      id: number
      name: string
      description: string
    }
    fuel_type: {
      id: number
      name: string
      description: string
    }
    transmission: {
      id: number
      name: string
      description: string
    }
    cylinder: {
      id: number
      name: string
      description: string
    }
    car_status: {
      id: number
      name: string
      description: string
    }
    door: number
    mileage: number
    price: string
    color: string
    year: string
    vehicle_model: {
      id: number
      name: string
      description: string
      brand_name: {
        id: number
        name: string
        description: string
      }
    }
    car_images: CarImage[]
    safety_features: Feature[]
    features: Feature[]
  }
  
  