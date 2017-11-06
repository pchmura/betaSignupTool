/* eslint func-names:0 */

import expect from 'expect';
import userModel from './userModel';

describe('User Model', () => {
    let client;

    beforeEach(() => {
        client = () => { };
        client.link = () => ({});
    });

    it('should show basic infos', () => {
        expect(userModel.queries.selectOne.table()).toEqual('user_account');
        expect(userModel.queries.selectOne.returnFields()).toEqual([
            'id',
            'email',
            'password',
        ]);
    });

    it('should correctly retrieve user by email', async function () {
        client = {
            link: () => ({
                findByEmail: (email) => {
                    expect(email).toEqual('email@example.org');

                    return Promise.resolve([{ id: 42, email: 'email@example.org' }]);
                },
            }),
        };

        const res = await userModel(client).findByEmail('email@example.org');
        expect(res).toEqual({ id: 42, email: 'email@example.org' });
    });
});
