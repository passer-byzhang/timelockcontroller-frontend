import {useState,useEffect} from 'react';
import { ClientError, gql, request as gqlRequest, Variables } from 'graphql-request';
import { graphqlLodash } from 'graphql-lodash';
import {TimeLockModel} from '../../models/graphModel'
import TimeLockItem from '../TimeLockItem';
const GET_TIMELOCK = gql`
  query ($where: CreateTimeLock_filter){
    createTimeLocks(where:$where)
    {
      id
      timelock
      owner
      blockNumber
    }
  }
`;

export async function graphRequest(
	document: string,
	variables?: Variables,
	requestHeaders?: HeadersInit,
){
	try {
		const { query, transform } = graphqlLodash(`${document}`);
		const result = await gqlRequest("https://api.thegraph.com/subgraphs/name/passer-byzhang/timelock", query, variables, requestHeaders);
		return transform(result);
	} catch (error) {
		throw error;
	}
}

export default function TimeLockList(){
  const [list,setList] = useState<TimeLockModel[]>();
  const variables = {
    where: {owner:'0x32591D58BbD3594bd8d05a5968B50926d5f3714E'},
  }
  useEffect(
    ()=>{
      graphRequest(GET_TIMELOCK,variables).then(data=>setList(data["createTimeLocks"]));
    }
  )
  const listItems = list?.map((d) => <li key={d.blockNumber} ><TimeLockItem info={d}/></li>);
  return (
    <>
     {listItems}
    </>
  )
}



