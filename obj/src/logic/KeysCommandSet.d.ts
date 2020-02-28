import { CommandSet } from 'pip-services3-commons-node';
import { IKeysController } from './IKeysController';
export declare class KeysCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IKeysController);
    private makeGetKeysCommand;
    private makeGetKeyByIdCommand;
    private makeGetKeyByKeyCommand;
    private makeGetKeysRangeCommand;
    private makeCreateKeyCommand;
    private makeUpdateKeyCommand;
    private makeDeleteKeyByIdCommand;
}
