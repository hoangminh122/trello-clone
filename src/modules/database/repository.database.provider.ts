import { Board } from "src/entities/Board";
import { Card } from "src/entities/Card";
import { Checklist } from "src/entities/checklist";
import { Label } from "src/entities/label";
import { List } from "src/entities/List";
import { User } from "src/entities/User";
import { Item } from './../../entities/item';

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

export const labelRepository = {
    provide:'LabelRepository',
    useValue:Label
}

export const itemRepository = {
    provide:'ItemRepository',
    useValue:Item
}

export const checklistRepository = {
    provide:'ChecklistRepository',
    useValue:Checklist
}


