"use client"; // This is a client component 👈🏽
import Layout  from '../components/Layout';
import TimeLockList from '../components/graph/TimeLockList';

export default function newTimeLock() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <strong className="flex justify-center text-6xl text-neutral-900 pb-20 pt-20">Created TimeLocks</strong>
        <div className="flex justify-center text-neutral-900 w-3/4">
          <TimeLockList />
        </div>
      </div>
    </Layout>
  )
}
