import { useRouter } from 'next/router'
import Link from "next/link"
import Layout  from '../../components/Layout';
export default function TimeLockPage() {
  const  router = useRouter();
  const  {TimeLock}  = router.query;  
  const exploreLink = "https://mumbai.polygonscan.com/address/"+TimeLock;
  return (
    <Layout>
        <p>explore: <Link href={exploreLink}>{TimeLock}</Link></p>
    </Layout>
  )
}

