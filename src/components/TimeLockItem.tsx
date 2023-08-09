import {TimeLockModel} from '../models/graphModel'
import { useRouter } from 'next/router'

export default function TimeLockItem({
    info,
  }: {
    info: TimeLockModel
  }) {

    const router = useRouter()
    return (
        <>
          <div>{info.timelock}</div>
          <div> owner: {info.owner}</div>
          <button type="button" onClick={() => router.push(
            '/TimeLockManagePage/[TimeLock]',
            '/TimeLockManagePage/'+info.timelock,
            )}>
                Manage
          </button>
        </>
    )
  }