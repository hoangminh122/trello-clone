import { Board } from "src/entities/Board";
import { User } from "src/entities/User";

export const userRepository = {
    provide:'userRepository',
    useValue:User
}

export const boardRepository = {
    provide:'BoardRepository',
    useValue:Board
}

