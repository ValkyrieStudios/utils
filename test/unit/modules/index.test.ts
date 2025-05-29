import {describe, it, expect} from 'vitest';
import * as LibModules from '../../../lib/modules';
import PubSub from '../../../lib/modules/PubSub';
import Scheduler from '../../../lib/modules/Scheduler';

describe('Modules - *', () => {
    it('Should be a correct export', () => {
        expect(LibModules.PubSub).toEqual(PubSub);
        expect(LibModules.Scheduler).toEqual(Scheduler);
    });
});
