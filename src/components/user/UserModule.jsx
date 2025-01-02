import React,{useState}from"react";import{MessageSquare,Bell}from"lucide-react";import Dashboard from"./Dashboard";import CalendarView from"./CalendarView";import NotificationsView from"./NotificationsView";const UserModule=({companies=[],setCompanies,communicationMethods=[]})=>{const[view,setView]=useState("dashboard");const[selectedDate,setSelectedDate]=useState(new Date());const[overriddenCommunications,setOverriddenCommunications]=useState([]);const getNotifications=()=>{const today=new Date();today.setHours(0,0,0,0);let overdueCount=0,dueTodayCount=0;companies.forEach((company)=>{const nextComm=company.communications?.[0];if(nextComm){const nextCommDate=new Date(nextComm.date);nextCommDate.setHours(0,0,0,0);if(nextCommDate<today){overdueCount+=1;}else if(nextCommDate.getDate()===today.getDate()&&nextCommDate.getMonth()===today.getMonth()&&nextCommDate.getFullYear()===today.getFullYear()){dueTodayCount+=1;}}});return overdueCount+dueTodayCount;};const notificationBadgeCount=getNotifications();const tabButtonStyle={width:"200px",padding:"12px 24px",margin:"0 10px",border:"2px solid #000",borderRadius:"8px",color:"#000",backgroundColor:"white",cursor:"pointer",fontSize:"16px",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"background-color 0.3s,color 0.3s"};const activeTabStyle={...tabButtonStyle,backgroundColor:"#000",color:"white"};const badgeStyle={position:"absolute",top:"-5px",right:"-10px",backgroundColor:"red",color:"white",borderRadius:"50%",padding:"2px 6px",fontSize:"12px"};return(<div className="max-w-7xl mx-auto p-6"><div style={{display:"flex",justifyContent:"center",marginBottom:"30px",gap:"20px"}}><button style={view==="dashboard"?activeTabStyle:tabButtonStyle}onClick={()=>setView("dashboard")}><MessageSquare className="h-5 w-5 mr-2"/>Dashboard</button><button style={view==="calendar"?activeTabStyle:tabButtonStyle}onClick={()=>setView("calendar")}><Bell className="h-5 w-5 mr-2"/>Calendar</button><button style={view==="notifications"?activeTabStyle:tabButtonStyle}onClick={()=>setView("notifications")}><Bell className="h-5 w-5 mr-2"/>Notifications{notificationBadgeCount>0&&(<span style={badgeStyle}className="ml-2">{notificationBadgeCount}</span>)}</button></div>{view==="dashboard"&&(<div className="bg-white rounded-lg shadow-lg p-6"><Dashboard companies={companies}overriddenCommunications={overriddenCommunications}setOverriddenCommunications={setOverriddenCommunications}setCompanies={setCompanies}communicationMethods={communicationMethods}/></div>)}{view==="calendar"&&(<div className="bg-white rounded-lg shadow-lg p-6"><CalendarView companies={companies}selectedDate={selectedDate}setSelectedDate={setSelectedDate}/></div>)}{view==="notifications"&&(<div className="bg-white rounded-lg shadow-lg p-6"><NotificationsView companies={companies}overriddenCommunications={overriddenCommunications}setOverriddenCommunications={setOverriddenCommunications}/></div>)}</div>);};export default UserModule;
