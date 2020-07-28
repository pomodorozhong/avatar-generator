import { View } from "./view";

export class Presenter{
    view: View;
    
    constructor() {
        this.view = new View(this);
    }
}