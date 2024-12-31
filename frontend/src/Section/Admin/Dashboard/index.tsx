
import AdminStats from "../../../components/Admin/AdminStats";
import ApexChart from "../../../components/Admin/ApexChart";

const Dashboard:React.FC=()=> {



  return (
    <div className=" w-full ">
    <AdminStats />
    <div className=" lg:flex ">
    <ApexChart />
    <div className="my-10 mx-16">
    <h5 className="text-xl font-bold dark:text-white">Recent Agents</h5>
    <div className="flex items-center gap-4 mt-8">
   <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiB_hwnr2qi68_5lIrxK6fE74AlsQemoqOQw&s" alt="" />
   <div className="font-medium ">
       <div>Jese Leos</div>
       <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
   </div>
</div>
<div className="flex items-center gap-4 mt-8">
   <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gka0l1ZzNvolZQoaOUCZLAegXtk_mom0DA&s" alt="" />
   <div className="font-medium ">
       <div>Jese Leos</div>
       <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
   </div>
</div>
<div className="flex items-center gap-4 mt-8">
   <img className="w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
   <div className="font-medium ">
       <div>Jese Leos</div>
       <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
   </div>
</div>
<div className="flex items-center gap-4 mt-8">
   <img className="w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg" alt="" />
   <div className="font-medium ">
       <div>Jese Leos</div>
       <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
   </div>
</div>

    </div>
    </div>
   
   </div>
  );
}

export default Dashboard;