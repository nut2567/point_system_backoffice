// components/MongoDBConnect.tsx

import { FaDatabase } from "react-icons/fa";
import { SiMongodb, SiMongoose } from "react-icons/si";

function MongoDBConnect() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Connect with MongoDB Atlas
      </h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <SiMongodb className="text-green-600 w-10 h-10" />
          <span className="text-lg font-medium text-gray-700">MongoDB</span>
        </div>
        <FaDatabase className="text-gray-400 w-6 h-6" />
        <div className="flex items-center space-x-2">
          <SiMongoose className="text-red-600 w-10 h-10" />
          <span className="text-lg font-medium text-gray-700">Mongoose</span>
        </div>
      </div>
    </div>
  );
}

export default MongoDBConnect;
