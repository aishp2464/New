import { motion } from "framer-motion";
import img1 from "../assets/hostel1.jpg";
import img2 from "../assets/hostel2.jpg";
import img3 from "../assets/hostel3.jpg";
import img4 from "../assets/hostel4.jpg";
import vid1 from "../assets/hostel1.mp4";
import vid2 from "../assets/hostel2.mp4";
const Gallery = () => {
  return (
    <motion.div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        color: "white",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "30px",
          fontWeight: "600",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
     <strong>📸 Hostel Gallery</strong>
      </h2>
      {/* First Row - 3 Images */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[img1, img2, img3].map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img
              src={img}
              alt={`Hostel ${index + 1}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                transition: "transform 0.4s ease-in-out",
              }}
            />
          </motion.div>
        ))}
      </div>
      {/* Second Row - 1 Image + 2 Videos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={img4}
            alt="Hostel 4"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              transition: "transform 0.4s ease-in-out",
            }}
          />
        </motion.div>
        {/* Videos */}
        {[vid1, vid2].map((vid, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <video
              src={vid}
              controls
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px",
                transition: "transform 0.4s ease-in-out",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default Gallery;