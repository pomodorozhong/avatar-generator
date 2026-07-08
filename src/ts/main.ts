import { Presenter } from "./presenter";
import { View } from "./view";
import { ControlGenerator } from "./controlGenerator";
import { PatternManager } from "./patternManager";
import { createPatterns } from "./patterns";

const patternManager = new PatternManager(createPatterns());
const presenter = new Presenter(patternManager);
const controlGenerator = new ControlGenerator(presenter);
new View(presenter, controlGenerator);
