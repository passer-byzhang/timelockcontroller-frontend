"use client"; // This is a client component 👈🏽
import Layout  from '../components/Layout';
import {CreateNewTimeLockForm} from '@/components/contract/TimeLockFactory';
export default function newTimeLock() {
  return (
    <Layout>
      <strong className="flex justify-center text-6xl text-neutral-900 pb-20 pt-20">Create a new timelock</strong>
      <div className="flex justify-center">
        <CreateNewTimeLockForm />
      </div>
    </Layout>
  )
}
