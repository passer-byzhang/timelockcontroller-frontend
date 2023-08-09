"use client"; // This is a client component 👈🏽
import Layout  from '../components/Layout';
import {CreateNewTimeLockForm} from '@/components/contract/TimeLockFactory';
export default function newTimeLock() {
  return (
    <Layout>
      <div className="flex justify-center">
        <CreateNewTimeLockForm />
      </div>
    </Layout>
  )
}
