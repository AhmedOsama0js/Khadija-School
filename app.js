const NAME = document.querySelector("#Name");
const BODY = document.querySelector("#Body-natega");
const Table = document.querySelector("#Table-nat");
const numGelos = document.querySelector(".num-gelos");
const btnSearch = document.querySelector("#btn-search");
const select = document.querySelector(".form-select");
const TABLE = document.querySelector(".table");
const inputLabel = document.querySelector("#inputLabel");
const gelosInput = document.querySelector("#gelosInput");
let arr;

let student;

fetch("./Khadija.json")
  .then((res) => res.json())
  .then((data) => {
    const { first, second} = data;

    btnSearch.addEventListener("click", () => {
      const studentId = numGelos.value;
      let selectedGradeData;

      // تحديد بيانات الصف بناءً على الاختيار
      switch (select.value) {
        case "1":
          selectedGradeData = first;
          break;
        case "2":
          selectedGradeData = second;
          break;
        default:
          deleteData("اختر الصف أولا");
          return;
      }
      animation();
      student = select.value;
      handleStudentData(selectedGradeData, studentId);
    });
  });

select.addEventListener("change", () => {
  inputLabel.textContent = "رقم الجلوس";
  gelosInput.placeholder = "ادخل رقم الجلوس";
});

const handleStudentData = (data, id) => {
  const label = "رقم الجلوس";

  const studentData = data.find((item) => {
    return item.Student_ID == id;
  });

  if (studentData) {
    printDATA(studentData);
  } else if (id === "") {
    deleteData(`ادخل ${label}`);
  } else {
    deleteData(`${label} غير متوفر في الصف المحدد`);
  }
};

// delete-data-from-error
const deleteData = (information) => {
  NAME.innerHTML = information;
  Table.innerHTML = "";
  BODY.innerHTML = "";
};

// print-data-in-page
const printDATA = (studentData) => {
  NAME.innerHTML = studentData.name;
  Table.innerHTML = `
    <tr class="text-white">
      <th scope="col" class="p-4 bg-pink-400 rounded-r-2xl shadow-sm">المادة</th>
      <th scope="col" class="p-4 bg-pink-400 rounded-l-2xl shadow-sm">الدرجات</th>
    </tr>
  `;
  
  const subjects = [
    { label: "العربي", value: studentData.Arabic },
    { label: "الانجليزي", value: studentData[" english"] || studentData.english },
    { label: "الرياضيات", value: studentData[" mathematics"] || studentData.mathematics },
    { label: "العلوم", value: studentData.Sciences },
    { label: "الدراسات", value: studentData.Social_Studies },
    { label: "الدين", value: studentData.Religious_Education },
    { label: "الحاسب الآلي", value: studentData.technology },
    { label: "التربية الفنية", value: studentData.art },
    { label: "التربية الرياضية", value: studentData.physical_education },
    { label: "نشاط 1", value: studentData.Activity_1 },
    { label: "نشاط 2", value: studentData.Activity_2 }
  ];

  // إضافة الموسيقى إذا وجدت (موجودة في أولى وغير موجودة في تانية غالباً)
  if (studentData["Music "] !== undefined || studentData.Music !== undefined) {
    subjects.push({ label: "التربية الموسيقية", value: studentData["Music "] || studentData.Music });
  }

  // إضافة المجموع الكلي
  const totalValue = studentData.Total || studentData.total;
  if (totalValue !== undefined) {
    subjects.push({ label: "المجموع الكلي", value: totalValue });
  }

  BODY.innerHTML = subjects.filter(sub => sub.value !== undefined).map(sub => `
    <tr class="animate-fadeIn bg-white/60 hover:bg-white/80 transition-all duration-300">
      <td class="p-4 rounded-r-2xl border-l-[3px] border-pink-200">${sub.label}</td>
      <td class="p-4 rounded-l-2xl font-black text-pink-600">${sub.value}</td>
    </tr>
  `).join('');
};

function animation() {
  TABLE.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  NAME.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  setTimeout(() => {
    TABLE.style.animation = "none";
    NAME.style.animation = "none";
  }, 1000);
}
