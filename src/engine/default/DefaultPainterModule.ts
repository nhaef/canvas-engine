import { PainterModule } from "../PainterModule"
import { DefaultPainterInstance } from "./DefaultPainterInstance";

export class DefaultPainterModule extends PainterModule {
    
    public async newInstance(): Promise<DefaultPainterInstance> {
        return (await WebAssembly.instantiate(this.module)) as DefaultPainterInstance;
    }

    protected isValid(): boolean {
        const exports = WebAssembly.Module.exports(this.module);

        return exports.find(e => e.kind === "function" && e.name === "init") !== undefined
            && exports.find(e => e.kind === "function" && e.name === "next") !== undefined
            && exports.find(e => e.kind === "function" && e.name === "getLastActionColor") !== undefined
            && exports.find(e => e.kind === "function" && e.name === "getLastActionDirection") !== undefined;
    }

    protected getImports(): WebAssembly.Imports {
        return {
            env: {
                abort: (msg: string) => console.error(`Painter aborted with message ${msg}`)
            }
        };
    }

}