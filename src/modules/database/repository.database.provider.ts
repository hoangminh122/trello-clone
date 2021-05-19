import { User } from "src/entities/User";

export const userRepository = {
    provide:'userRepository',
    useValue:User
}

