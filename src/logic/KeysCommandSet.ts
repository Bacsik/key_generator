import { CommandSet, FilterParams, PagingParams } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';

import { KeyV1Schema } from '../data/version1/KeyV1Schema';
import { IKeysController } from './IKeysController';

export class KeysCommandSet extends CommandSet {
    private _controller: IKeysController;

    constructor(controller: IKeysController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGetKeysCommand());
        this.addCommand(this.makeGetKeyByIdCommand());
        this.addCommand(this.makeGetKeyByKeyCommand());
        this.addCommand(this.makeGetKeysRangeCommand());
        this.addCommand(this.makeCreateKeyCommand());
        this.addCommand(this.makeUpdateKeyCommand());
        this.addCommand(this.makeDeleteKeyByIdCommand());
    }

    private makeGetKeysCommand(): ICommand {
        return new Command(
            'get_keys',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                this._controller.getKeys(correlationId, filter, paging, callback);
            }
        );
    }

    private makeGetKeyByIdCommand(): ICommand {
        return new Command(
            'get_key_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('key_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let keyId = args.getAsString('key_id');
                this._controller.getKeyById(correlationId, keyId, callback);
            }
        );
    }

    private makeGetKeyByKeyCommand(): ICommand {
        return new Command(
            'get_key_by_key',
            new ObjectSchema(true)
                .withRequiredProperty('key', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let key = args.getAsString('key');
                this._controller.getKeyByKey(correlationId, key, callback);
            }
        );
    }

    private makeGetKeysRangeCommand(): ICommand {
        return new Command(
            'get_keys_range',
            new ObjectSchema(true)
                .withRequiredProperty('key', TypeCode.String)
                .withOptionalProperty('number', TypeCode.Integer),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let key = args.getAsString('key');
                let number = args.getAsIntegerWithDefault('number',5);
                this._controller.getKeysRangeByKey(correlationId, key, number, callback);
            }
        );
    }

    private makeCreateKeyCommand(): ICommand {
        return new Command(
            'create_key',
            new ObjectSchema(true)
                .withRequiredProperty('key', new KeyV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let key = args.getAsObject('key');
                this._controller.createKey(correlationId, key, callback);
            }
        );
    }   

    private makeUpdateKeyCommand(): ICommand {
        return new Command(
            'update_key',
            new ObjectSchema(true)
                .withRequiredProperty('key', new KeyV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let key = args.getAsObject('key');
                this._controller.updateKey(correlationId, key, callback);
            }
        );
    }   
    
    private makeDeleteKeyByIdCommand(): ICommand {
        return new Command(
            'delete_key_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('key_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let keyId = args.getAsString('key_id');
                this._controller.deleteKeyById(correlationId, keyId, callback);
            }
        );
    }

}