"use client"; // This is a client component 👈🏽
import Layout  from '../components/Layout';
import TimeLockList from '../components/graph/TimeLockList';
export default function newTimeLock() {
  return (
    <Layout>
      <div className="fixed left-10 top-10">
        <>
        <TimeLockList />
        </>
      </div>
    </Layout>
  )
}
