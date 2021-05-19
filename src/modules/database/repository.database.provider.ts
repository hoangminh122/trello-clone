import { User } from "src/entities/user";

export const userRepository = {
    provide:'userRepository',
    useValue:User
}

