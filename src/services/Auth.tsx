import { gql } from 'apollo-boost';
import client, { resError } from './Client';

export const loginCms = async (input: any) => {
	return await client.mutate({
		mutation: gql`
           mutation postLogin($email: String!, $password: String!){
				auth: postLogin(input:{email: $email, password: $password}){
					token
						user{
						_id
						firstName
					}
				}
			}`,
		variables: {
			email: input.email,
			password: input.password
		}
	}).then(res => {
		return res
	}).catch(err => {
		return resError(err);
	});
}