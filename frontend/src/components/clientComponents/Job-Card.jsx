import { Eye, Clock, DollarSign, MapPin, Calendar, Phone, Mail, MapPinned, HandCoins} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Card} from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const BASE_URL = import.meta.env.VITE_API2; // Environment variable for API base URL

export default function JobCard({id,job }) {
  const [selectedPostulator, setSelectedPostulator] = useState(null);
  const [postulators, setPostulas] = useState([]);
  const [isacceptedPostulator, setIsacceptedPostulator] = useState(false);

  const fetchALlPostulers = async (offreId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.get(`${BASE_URL}/api/client/offre/${offreId}/postulas`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });
  
      if (response.status === 200) {
        console.log("✅ Fetched postulators:", response.data);
        setPostulas(response.data); // Update state with real API data
      } else {
        console.warn("⚠️ API returned unexpected response:", response);
      }
    } catch (error) {
      console.error("❌ Error fetching jobs:", error);
    }
  };

  const handleRefuser = async (postulationId) => {
    try {

      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.put(`${BASE_URL}/api/client/postulation/${postulationId}/refuser`, {
        id, // Pass freelancer ID as data /postulation/{id}/refuser
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });

      if (response.status === 200) {
        console.log("✅ Favorite Freelancer:", response.data);
        setIsacceptedPostulator(false);
      } else {
        console.warn("⚠️ API returned unexpected response:", response);
      }
    } catch (error) {
      console.error("❌ Error favorite freelancer:", error);
    }
  };
  const handleAccept = async (postulationId) => {
    try {

      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.put(`${BASE_URL}/api/client/postulation/${postulationId}/accepter`, {
        id, // Pass freelancer ID as data 
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });

      if (response.status === 200) {
        console.log("✅ Favorite Freelancer:", response.data);
        setIsacceptedPostulator(true);
      } else {
        console.warn("⚠️ API returned unexpected response:", response);
      }
    } catch (error) {
      console.error("❌ Error favorite freelancer:", error);
    }
  };

  useEffect(() => {
    fetchALlPostulers(id);
  }, [id]);
  
  
  const PostulatorDialog = ({ prestataire,prix,description,postulationId, isOpen, onClose }) => {
    if (!prestataire) return null;



    console.log("🚀 ~ file: Job-Card.jsx ~ line 101 ~ PostulatorDialog ~ postulator", prestataire);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Postulator Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-4">
            <Avatar className="h-24 w-24 border-4 border-[#12AE65]">
              <AvatarImage src={prestataire.imageUrl} alt={`${prestataire.prenom} ${prestataire.nom}`} />
              <AvatarFallback
                className={`bg-[#E6F9EF]  border-4 border-[#12AE65] text-xl  `}
              >
                <img
                   src={BASE_URL + "/api/images/prestataires" + prestataire.imageUrl}
                   alt={`${prestataire.prenom} ${prestataire.nom}`}
                   className="h-full w-full object-cover rounded-full border-2 border-[#12AE65] cursor-pointer hover:scale-110 transition-transform"
                />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-bold">{`${prestataire.prenom} ${prestataire.nom}`}</h3>
              <p className="text-gray-500">{description || "No description available"}</p>
            </div>
            <div className="w-full space-y-3">
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#12AE65]" />
                <span>{prestataire.telephone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#12AE65]" />
                <span>{prestataire.email}</span>
              </div>
              <div className="flex items-center">
                <MapPinned className="mr-2 h-5 w-5 text-[#12AE65]" />
                <span>{`${prestataire.adresse}, ${prestataire.ville}`}</span>
              </div>
              <div className="flex items-center">
                <HandCoins className="mr-2 h-5 w-5 text-[#12AE65]" />
                <span>Proposed Price: {prix} dh</span>
              </div>
            </div>
            <div className="w-full flex justify-around pt-4 ">
              <Badge onClick={()=>handleAccept(postulationId)} className=" py-2 font-bold text-xl rounded-lg justify-center bg-[#12AE65] hover:cursor-pointer hover:bg-[#0d8d52]">
                Accepter
              </Badge>
              <Badge onClick={()=>handleRefuser(postulationId)} className=" py-2 font-bold text-xl text-white rounded-lg justify-center bg-gray-950  hover:cursor-pointer hover:bg-[#FF4338] ">
                Refused
              </Badge>
            </div>
            {isacceptedPostulator ?
             <span className="text-green-500"> vous avez accepté ce proposition</span>
             :              <span className="text-[#FF4338]"> vous n'avez pas accepté ce proposition</span>

            }
           
            
          </div>
        </DialogContent>
      </Dialog>
    );
  };


  console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️postulators⚠️⚠️⚠️⚠️⚠️⚠️⚠️", postulators);
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-[#12AE65]">
                <AvatarImage src={job.image} alt={job.title} />
                <AvatarFallback className="bg-[#E6F9EF] text-[#12AE65]">
                  {job.title?.[0] || 'J'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4 text-[#12AE65]" />
                  {job.ville}
                </div>
              </div>
            </div>
            <Badge   className={`text-sm text-white ${job.status === "COMPLITED" ? "bg-[#12AE65]" : "bg-gray-500"}`}>
              {job.status}
            </Badge>
          </div>

          {/* Job Description */}
          <p className="text-gray-600">{job.description}</p>

          {/* Job Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="rounded-full">
              <Calendar className="mr-1 h-3 w-3 text-[#12AE65]" />
              {new Date(job.dateCreation).toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              <Clock className="mr-1 h-3 w-3 text-[#12AE65]" />
              {new Date(job.dateExpiration).toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              <DollarSign className="mr-1 h-3 w-3 text-[#12AE65]" />
              {job.prix}€
            </Badge>
          </div>

          {/* Postulators Section */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">Postulators</h4>
            <div className="flex flex-wrap gap-3">
              {postulators.map((postulator) => (
                <Avatar
                  key={postulator.prestataire.id}
                  className={`bg-[#E6F9EF] text-[#12AE65] border-4 text-xl ${
                    postulator.status === "ACCEPTED"
                      ? "border-[#12AE65]" // Green border for ACCEPTED
                      : postulator.status === "EN_COURS"
                      ? "border-[#FF0000]" // Red border for EN_COURS
                      : "border-[#000000]" // Default border (optional)
                  }`}     
                  onClick={() => setSelectedPostulator(postulator)}
                >
                  <AvatarImage 
                    src={postulator.prestataire.imageUrl} 
                    alt={`${postulator.prestataire.prenom} ${postulator.prestataire.nom}`}
                  />
                  <AvatarFallback className="bg-[#E6F9EF] text-[#12AE65]">
                    {/* {postulator.prestataire.prenom[0]} */}
                    <img src={BASE_URL+"/api/images/prestataires"+postulator.prestataire.imageUrl} alt={`${postulator.prestataire.prenom} ${postulator.prestataire.nom}`} 
                    className="h-12 w-12 border-2 border-[#12AE65] cursor-pointer hover:scale-110 transition-transform" />
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="text-sm text-gray-500">
              <Eye className="inline mr-1 h-4 w-4 text-[#12AE65]" />
              {postulators.length } views
        </div>
            <Button className="bg-[#12AE65] hover:bg-[#0F9A59] text-white w-full sm:w-auto">
              View Details 
              <Eye className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Postulator Details Dialog */}
      <PostulatorDialog
        prestataire={selectedPostulator?.prestataire}
        prix={selectedPostulator?.prix}
        postulationId={selectedPostulator?.id}
        description={selectedPostulator?.description}
        status={selectedPostulator?.status}
        isOpen={!!selectedPostulator}
        onClose={() => setSelectedPostulator(null)}
      />
    </Card>
  );
};





// <div className="rounded-lg border bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      
      
// <div className="flex flex-col space-y-4">
//   <div className="flex items-center justify-between">
//     <div className="flex items-center space-x-4">
//       <Avatar className="h-12 w-12 border-2 border-[#12AE65]">
//         <AvatarImage src={image} alt={title} />
//         <AvatarFallback className="bg-[#E6F9EF] text-[#12AE65]">{title[0]}</AvatarFallback>
//       </Avatar>
//       <div>
//         <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//         <div className="flex items-center text-sm text-gray-500">
//           <MapPin className="mr-1 h-4 w-4 text-[#12AE65]" />
//           {ville}
//         </div>
//       </div>
//     </div>
//     <Badge variant={status === "active" ? "success" : "secondary"} className="text-xs">
//       {status}
//     </Badge>
//   </div>
//   <p className="text-gray-600">{description}</p>
//   <div className="flex flex-wrap items-center gap-3">
//     <Badge variant="outline" className="rounded-full px-3 py-1">
//       <Calendar className="mr-1 h-3 w-3 text-[#12AE65]" />
//       Created: {new Date(dateCreation).toLocaleDateString()}
//     </Badge>
//     <Badge variant="outline" className="rounded-full px-3 py-1">
//       <Clock className="mr-1 h-3 w-3 text-[#12AE65]" />
//       Expires: {new Date(dateExpiration).toLocaleDateString()}
//     </Badge>
//     <Badge variant="outline" className="rounded-full px-3 py-1">
//       <DollarSign className="mr-1 h-3 w-3 text-[#12AE65]" />
//       {prix.toFixed(2)} €
//     </Badge>
//   </div>
//   <div className="flex justify-between items-center">
//     <div className="text-sm text-gray-500">
//       <Eye className="inline mr-1 h-4 w-4 text-[#12AE65]" />
//       {Math.floor(Math.random() * 100) + 1} views
//     </div>
//     <Link to={`/client/jobs/${id}`}>
//       <Button className="bg-[#12AE65] hover:bg-[#0F9A59] text-white">
//         View Details
//         <Eye className="ml-2 h-4 w-4" />
//       </Button>
//     </Link>
//   </div>
// </div>
// </div>