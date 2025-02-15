import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import cn from "classnames";
import { format } from "date-fns";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API2; // API Base URL from environment variables
export function PostJobForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState();
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
    
  //   // Create the offre object matching your API format
  //   const offreData = {
  //     title: title,
  //     description: description,
  //     prix: parseFloat(price),
  //     dateExpiration: date ? date.toISOString() : null,
  //     ville: city
  //   };

  //   // Convert offre object to JSON string and append to FormData
  //   formData.append("offre", JSON.stringify(offreData));
    
  //   // Append the file separately
  //   if (image) {
  //     formData.append("file", image);
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(`${API_BASE_URL}/api/client/offre/create`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log("✅ Job posted successfully:", response.data);
  //       onClose();
  //     } else {
  //       console.error("⚠️ Failed to post job:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error posting job:", error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Format the date to match LocalDateTime expected format
    const formattedDate = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : null;
    
    // Create the offre object matching your API format
    const offreData = {
      title: title,
      description: description,
      prix: parseFloat(price),
      dateExpiration: formattedDate,
      ville: city
    };

    // Convert offre object to JSON string and append to FormData
    formData.append("offre", JSON.stringify(offreData));
    
    // Append the file separately
    if (image) {
      formData.append("file", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/client/offre/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("✅ Job posted successfully:", response.data);
        onClose();
      } else {
        console.error("⚠️ Failed to post job:", response.data);
      }
    } catch (error) {
      console.error("❌ Error posting job:", error);
      // Log the actual error response from the server
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-center h-full">
        <div className="w-full max-w-4xl bg-background border border-[#12AE65] rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-[#12AE65]">Post a New Job</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="border border-[#12AE65] hover:text-white hover:bg-[#0d8d52]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#12AE65]">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter job title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[#12AE65]">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#12AE65]">Expiration Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#12AE65]" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#12AE65]">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#12AE65]">
                    Upload Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])} // Capture the selected file
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#12AE65]">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter job description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-[calc(100%-2rem)]"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose} className="hover:text-white hover:bg-[#0d8d52]">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#12AE65] hover:bg-[#0d8d52]">
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}