export enum GCEnum {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TEXT = 1,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    BLOCK = 2
}

export enum VCEnum {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TEXT = 1,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NUMBER = 10
}

export interface DisableBlockCommand {
    blockRef: string;
}

export interface AlterGroupCommand {
    gc: GCEnum;
    vc: VCEnum;
    ref: string;
    value: string | number;
}

export interface MoveBlockCommand {
    blockRef: string;
    position: number;
    spacing: number;
    index: number;
}

export interface DxfBlockCommands {
    blockRef: string;
    commands: AlterGroupCommand[];
}

export interface InsertBlockCommands {
    blockRef: string;
    x: number;
    y: number;
    z: number;
}

export interface DxfCommands {
    commands: AlterGroupCommand [];
    moveCommands: MoveBlockCommand[];
    disableBlocks: DisableBlockCommand[];
    blocks: DxfBlockCommands[];
    insertBlocks: InsertBlockCommands[];
}

export interface ParseDxfUrlRequest {
    dxfUrl?: string;
    dxfContent?: string;
    dxfCommands: DxfCommands;
}


export class DxfCmdHelper {

    cmds: DxfCommands;

    constructor() {
        this.cmds = {
            commands: [],
            disableBlocks: [],
            blocks: [],
            moveCommands: [],
            insertBlocks: []
        };
    }

    insertBlock(blockRef: string, x: number, y: number, z: number) {
        this.cmds.insertBlocks.push({
            blockRef, x, y, z
        });
        return this;
    }

    disableBlock(blockRef: string) {
        this.cmds.disableBlocks.push({
            blockRef
        });
        return this;
    }

    moveX(blockRef: string, position: number, spacing: number, index: number) {
        this.cmds.moveCommands.push({
            blockRef,
            position,
            spacing,
            index
        });
        return this;
    }

    rename(varName: string, varValue: string, blockRef?: string) {
        let commands: AlterGroupCommand[];
        if (blockRef) {
            let blockCommands: DxfBlockCommands | undefined = this.cmds.blocks.find(cmd => cmd.blockRef === blockRef);
            if (!blockCommands) {
                blockCommands = {blockRef, commands: []};
                this.cmds.blocks.push(blockCommands);
            }
            commands = blockCommands.commands;
        } else {
            commands = this.cmds.commands;
        }
        commands.push({
            gc: GCEnum.TEXT,
            vc: VCEnum.TEXT,
            ref: varName,
            value: varValue
        });
        return this;
    }

}
