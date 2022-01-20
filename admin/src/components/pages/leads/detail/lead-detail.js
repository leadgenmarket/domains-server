import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const LeadDetail = () => {
    const { id } = useParams()
    const [lead, setLead] = useState("")
    useEffect(() => {
        axios.get("/api/lead/" + id)
    }, [])
    return <div className="main-content">
        <div className="page-content">
            <pre>{lead}</pre>
        </div>
    </div>
}

export default LeadDetail