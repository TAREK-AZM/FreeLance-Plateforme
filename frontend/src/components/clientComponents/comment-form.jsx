
import { useState } from "react";
import { useAuthStore } from "../../store/store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

export default function CommentForm({ onSubmit }) {
  const { user } = useAuthStore();
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmit({
      name: user?.name || "Anonymous",
      rating,
      comment,
      time: "Just now",
    });

    setRating(5);
    setComment("");
  };

  return (
    <Card className="mt-8">
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-2xl font-bold mb-6">Write a review</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="p-1 focus:outline-none"
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(value)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= (hoveredRating || rating)
                        ? "fill-[#FFA500] text-[#FFA500]"
                        : "fill-gray-200 text-gray-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience working with this freelancer..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto bg-[#12AE65] hover:bg-[#0d8d52]">
            Submit Review
          </Button>
        </div>
      </form>
    </Card>
  );
}
