/* =====================================================================
   กำหนดการโครงงาน · ใช้ร่วมกันทั้งหน้าไทย (project.html) และอังกฤษ (project-en.html)
   แก้วันที่ที่ไฟล์นี้ไฟล์เดียว ทั้งสองหน้าจะเปลี่ยนตามกัน
   ---------------------------------------------------------------------
   TERM / TERM_EN   ชื่อภาคการศึกษา (ไทย / อังกฤษ)
   from / due       วันเริ่มยื่น / วันสุดท้าย เขียนเป็น ค.ศ. ปี-เดือน-วัน เช่น "2026-12-15"
                    ถ้ายังไม่ทราบ ใส่ "" จะขึ้นว่า "รอประกาศ" / "TBA"
   what / sub       ชื่อขั้นตอน / คำอธิบายสั้น (ภาษาไทย)
   what_en / sub_en ชื่อขั้นตอน / คำอธิบายสั้น (ภาษาอังกฤษ)
   where / where_en ช่องทางยื่น · link = ลิงก์ ("#kong1" = ไปหัวข้อในหน้าเดียวกัน)
   เพิ่ม/ลบแถวได้ ลำดับในตารางเรียงตามที่เขียนไว้
   ===================================================================== */
const TERM    = "ภาคการศึกษา 2/2569";
const TERM_EN = "Trimester 2/2026";
const SCHEDULE = [
  { due:"2026-12-15", from:"",
    what:"ยื่นแบบ คง.1 ขอใช้ห้องปฏิบัติการ", sub:"ส่ง PDF ที่อาจารย์ลงนามแล้วให้เลขาสาขาวิชา",
    what_en:"Submit KN.1 form (lab access)", sub_en:"Send the PDF signed by your advisor to the School Secretary",
    where:"ระบบ คง.1", where_en:"KN.1 System", link:"#kong1" },
  { due:"2026-12-15", from:"",
    what:"ยื่นเบิกค่าใช้จ่าย งวดที่ 1", sub:"พร้อมโครงร่างโครงงาน (FM-ENG-PROJECT-PROPOSAL)",
    what_en:"Apply for funding, installment 1", sub_en:"With project proposal (FM-ENG-PROJECT-PROPOSAL)",
    where:"ระบบเบิกค่าใช้จ่ายโครงงาน", where_en:"Project Funding System", link:"#budget" },
  { due:"2027-01-31", from:"",
    what:"ยื่นเบิกค่าใช้จ่าย งวดที่ 2", sub:"พร้อมรายงานความก้าวหน้า (FM-ENG-PROJECT-PROGRESS)",
    what_en:"Apply for funding, installment 2", sub_en:"With progress report (FM-ENG-PROJECT-PROGRESS)",
    where:"ระบบเบิกค่าใช้จ่ายโครงงาน", where_en:"Project Funding System", link:"#budget" },
  { due:"2027-02-04", from:"",
    what:"ยื่นขอสอบโครงงานเทอม 2/2569", sub:"ผ่านระบบ PE Capstone Portal",
    what_en:"Request the project examination", sub_en:"Through the PE Capstone Portal",
    where:"PE Capstone Portal", where_en:"PE Capstone Portal", link:"capstone.html" },
  { due:"2027-02-10", from:"",
    what:"ช่วงวันสอบโครงงาน", sub:"ตามวันเวลาที่กรรมการนัดหมาย",
    what_en:"Project examination period", sub_en:"On the date and time set by your committee",
    where:"", where_en:"", link:"" },
  { due:"2027-02-14", from:"",
    what:"ส่งเล่มรายงานฉบับสมบูรณ์", sub:"หลังแก้ไขตามคำแนะนำของกรรมการสอบ",
    what_en:"Submit the final report", sub_en:"After revising it as advised by the committee",
    where:"", where_en:"", link:"" }
];
/* ===== จบข้อมูล (ด้านล่างไม่ต้องแก้) ===== */
(function(){
  const EN=(document.documentElement.lang||"").indexOf("en")===0;
  const T=EN?{
    M:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],D:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    title:"Project Schedule ",tba:"TBA",past:"Closed",starts:"Opens ",last:"Last day today",left:n=>n+(n===1?" day left":" days left"),
    open:n=>"Open · "+n+(n===1?" day left":" days left"),by:"By ",next:"Next: ",year:y=>y
  }:{
    M:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],D:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
    title:"กำหนดการโครงงาน ",tba:"รอประกาศ",past:"เลยกำหนดแล้ว",starts:"เริ่ม ",last:"วันนี้วันสุดท้าย",left:n=>"เหลืออีก "+n+" วัน",
    open:n=>"เปิดยื่นแล้ว · อีก "+n+" วัน",by:"ภายใน ",next:"ถัดไป: ",year:y=>y+543
  };
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const day=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||"");return m?new Date(+m[1],+m[2]-1,+m[3]):null};
  const fmt=d=>T.D[d.getDay()]+" "+d.getDate()+" "+T.M[d.getMonth()]+" "+T.year(d.getFullYear());
  const pick=(r,k)=>EN?(r[k+"_en"]||r[k]):r[k];
  const today=new Date();today.setHours(0,0,0,0);
  const body=document.getElementById("schedBody");if(!body)return;
  document.getElementById("schedTitle").textContent=T.title+(EN?TERM_EN:TERM);
  let next=null,nextLeft=null;
  body.innerHTML=SCHEDULE.map((r,i)=>{
    const f=day(r.from),d=day(r.due);let cls="",badge;
    if(!d) badge='<span class="badge tba">'+T.tba+'</span>';
    else{
      const left=Math.round((d-today)/864e5);
      if(left<0){cls="is-past";badge='<span class="badge past">'+T.past+'</span>'}
      else if(f&&today<f){badge='<span class="badge later">'+T.starts+f.getDate()+" "+T.M[f.getMonth()]+'</span>'}
      else if(left<=7){cls="is-soon";badge='<span class="badge soon">'+(left===0?T.last:T.left(left))+'</span>'}
      else if(f){badge='<span class="badge open">'+T.open(left)+'</span>'}
      else badge='<span class="badge later">'+T.left(left)+'</span>';
      if(left>=0&&!next){next=r;nextLeft=left}
    }
    const date=d?(f?fmt(f)+" –<br>"+fmt(d):T.by+fmt(d)):'<span style="color:var(--muted);font-weight:400">'+T.tba+'</span>';
    const w=pick(r,"where");
    const where=w?(r.link?'<a href="'+esc(r.link)+'">'+esc(w)+' →</a>':esc(w)):'<span class="none" style="color:var(--muted)">–</span>';
    const sub=pick(r,"sub");
    return '<div class="sched-row '+cls+'" role="row"><div class="what" role="cell"><span class="no">'+(i+1)+'</span><span><b>'+esc(pick(r,"what"))+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+'</span></div>'+
      '<div class="date" role="cell">'+date+'</div><div class="where" role="cell">'+where+'</div>'+badge+'</div>';
  }).join("");
  if(next)document.getElementById("schedNote").innerHTML=T.next+"<strong>"+esc(pick(next,"what"))+"</strong> · "+(nextLeft===0?T.last:T.left(nextLeft));
})();
