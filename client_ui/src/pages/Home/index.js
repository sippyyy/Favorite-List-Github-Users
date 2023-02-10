import { useState } from "react";
import Bar from "../../components/Bar";
import Content from "./components/Content";
import Pagination from "./components/Pagination";
import Profile from "./components/Profile";

function Home() {

    const [list,setList] = useState()
    const [mode,setMode] = useState('')
    const [user,setUser] = useState('') 
    const [view,setView] = useState('list')


    return ( 
        <>
            <Bar setMode={setMode} setList={setList} setView={setView} setUser={setUser} />
            <div>
                {view === 'list' ?
                (
                <>
                    <Content list={list} />
                    {mode === 'find' && list?.length >19 ?
                    <Pagination mode={mode} setList={setList} itemsPerPage={1} user={user} />
                    :
                    null}
                </>
                )
                :
                <Profile />
                }
            </div>
        </>
     );
}

export default Home;