import {useState,useEffect,useContext} from 'react';
import { ClientError, gql, request as gqlRequest, Variables } from 'graphql-request';
import { graphqlLodash } from 'graphql-lodash';
import {TimeLockModel} from '../../models/graphModel'
import {AccountContext} from '../../hooks/web3'
import {HashToSlice} from '../../utils/convert'
import { useRouter } from 'next/router'
import Link from "next/link"
import { Table,TableBody,TableCell,TableHead,TableRow,TableContainer,Paper} from '@material-ui/core';
const GET_TIMELOCK = gql`
  query ($where: CreateTimeLock_filter){
    createTimeLocks(where:$where)
    {
      id
      timelock
      owner
      blockNumber
      transactionHash
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
  const {account} = useContext(AccountContext);
  const variables = {
    where: {owner:account},
  }
  const router = useRouter()
  useEffect(
    ()=>{
      graphRequest(GET_TIMELOCK,variables).then(
        data=>{
          setList(data["createTimeLocks"])
        }
        );
    }
  )
  return (
    <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>CreateBlockNumber</TableCell>
           <TableCell align="center">Address</TableCell>
           <TableCell align="center">owner</TableCell>
           <TableCell align="center">transactionHash</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {list?.map((row) => (
           <TableRow key={row.blockNumber}>
             <TableCell component="th" scope="row">
               {row.blockNumber}
             </TableCell>
             <TableCell align="center">{row.timelock}</TableCell>
             <TableCell align="center">{HashToSlice(row.owner,6,4)}</TableCell>
             <TableCell align="center">{HashToSlice(row.transactionHash,6,4)}</TableCell>
             <TableCell align="center">
              <button type="button" onClick={() => router.push(
              '/TimeLockManagePage/[TimeLock]',
              '/TimeLockManagePage/'+row.timelock,
                )}>
                Manage
          </button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
  )
}



