import {z} from 'zod'

export const loginVaridationSchema = z.object({
    email:z.string().trim().email('Please enter a valid email'),
    password:z.string().trim().min(6,'Password at least 6 character needed')
})