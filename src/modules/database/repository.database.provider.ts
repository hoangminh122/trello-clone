import { Board } from "src/entities/Board";
import { Card } from "src/entities/Card";
import { List } from "src/entities/List";
import { User } from "src/entities/User";

export const userRepository = {
    provide:'userRepository',
    useValue:User
}

export const boardRepository = {
    provide:'BoardRepository',
    useValue:Board
}

export const listRepository = {
    provide:'ListRepository',
    useValue:List
}

export const cardRepository = {
    provide:'CardRepository',
    useValue:Card
}

