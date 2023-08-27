// är man i ett rum?

//är rummet tomt?

import { createContext } from "react";
import { IRoom } from "../models/IRoom";


export const EnterRoomContext = createContext<IRoom[]>([]);