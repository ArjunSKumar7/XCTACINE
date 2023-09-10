
import {UserNavBar} from "../../components/user/UserNavBar"
import Body from "../../components/user/Body"
import {UserHomeCard} from "../../components/user/UserHomeCard"
import { UserFooter } from "../../components/user/UserFooter"
const Home = () => {
  return (
    <>
<UserNavBar/>
<Body/>
<div className="bg-blue-gray-400 h-auto">
<UserHomeCard/>
</div>

<UserFooter/>

    </>
  )
}

export default Home