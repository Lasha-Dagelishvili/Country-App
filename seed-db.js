import fs from 'fs'
import { fetchCountries } from './src/api/countries'

const DATABASE_PATH = './database.json'

const seedDatabase = async () => {
    try {
        const processedCountries = await fetchCountries()

        let database = { countries: [] }
        if (fs.existsSync(DATABASE_PATH)) {
            const rawData = fs.readFileSync(DATABASE_PATH, 'utf-8')
            database = JSON.parse(rawData)
        }

        database.countries = processedCountries

        fs.writeFileSync(DATABASE_PATH, JSON.stringify(database, null, 2))
        console.log('Database seeded successfully!')
    } catch (error) {
        console.error('Error seeding database:', error)
    }
}

seedDatabase()
