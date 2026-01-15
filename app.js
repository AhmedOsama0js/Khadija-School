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

fetch("./Data2026.json")
  .then((res) => res.json())
  .then((data) => {
    const { first, second, third, fourth, fifth, Sixth } = data;

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
        case "3":
          selectedGradeData = third;
          break;
        case "4":
          selectedGradeData = fourth;
          break;
        case "5":
          selectedGradeData = fifth;
          break;
        case "6":
          selectedGradeData = Sixth;
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
  const selectedValue = select.value;
  const isIdBased = selectedValue === "1" || selectedValue === "2";

  const labelText = isIdBased ? "الرقم القومي" : "رقم الجلوس";
  const placeholderText = isIdBased ? "الرقم القومي" : "ادخل رقم الجلوس";

  inputLabel.textContent = labelText;
  gelosInput.placeholder = placeholderText;
});

const handleStudentData = (data, id) => {
  const isIdBased = student === "1" || student === "2";
  const label = isIdBased
    ? " اول 3 ارقام في الرقم القومي من جهة اليمين"
    : "رقم الجلوس";

  const studentData = data.find((student) => {
    if (isIdBased) {
      const nationalIdLast3 = `${student.Student_ID}`?.slice(-3);
      return nationalIdLast3 === id;
    } else {
      return student.Student_ID == id;
    }
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
    { label: "الرياضيات", value: studentData.mathematics },
    { label: "الانجليزي", value: studentData.english },
    { label: "الدين", value: studentData.Religious_Education }
  ];

  if (+student === 1 || +student === 2 || +student === 3) {
    subjects.push(
      { label: "متعدد التخصصات", value: studentData.Multidisciplinary },
      { label: "التربية البدنية والصحية", value: studentData.physical_education }
    );
  } else {
    subjects.push(
      { label: "الدراسات", value: studentData.Social_Studies },
      { label: "العلوم", value: studentData.Sciences },
      { label: "مهارات مهنية", value: studentData.Professional_skills },
      { label: "تكنولوجيا المعلومات", value: studentData.technology },
      { label: "التربية البدنية", value: studentData.physical_education },
      { label: "التربية الفنية", value: studentData.art },
      { label: "التربية الموسيقية", value: studentData.Music }
    );
  }

  subjects.push(
    { label: "القيم واحترام الآخر", value: studentData.Values_and_respect },
    { label: "أنشطة التوكاتسو", value: studentData.Tokatsu_activities }
  );

  BODY.innerHTML = subjects.map(sub => `
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
