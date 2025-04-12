"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale for dayjs
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import PhoneField from "./phoneField";
import IdField from "./idField";
import ComboBox from "./comboBox";
import GridSection from "./gridSection";

// Set the locale globally for dayjs
dayjs.locale("th");

const thaiLocaleText = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        localeText: {
          cancelButtonLabel: "ยกเลิก", // Thai for "Cancel"
          okButtonLabel: "ตกลง", // Thai for "OK"
          clearButtonLabel: "ล้างค่า", // Thai for "Clear"
          todayButtonLabel: "วันนี้", // Thai for "Today"
        },
      },
    },
  },
};

const dateTimeFormat = "DD MMM YYYY HH:mm"; // Thai date format
const textFieldVaraint = "standard"; // Standard variant for TextField
const fieldSize = "small"; // Small size for TextField

export default function CrimeReportForm() {
  const personOptions = ["ทำประวัติ", "ความผิดต่อชีวิต", "ความผิดต่อร่างกาย"];
  const genderOptions = ["ชาย", "หญิง", "LGBTQ+", "ไม่ระบุ"];
  const initialOptions = ["นาย", "นาง", "นางสาว", "ไม่ระบุ"];
  const reporterOptions = ["ด.ต.สมชาย", "ร.ต.อ.หญิง สุรีย์พร", "พ.ต.ท.อดิศร"];
  const [id, setId] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [reporter, setReporter] = React.useState<string>("");
  const [personType, setPersonType] = React.useState<string>("");
  const [crimeGender, setCrimeGender] = React.useState<string>("");
  const [crimeInitial, setCrimeInitial] = React.useState<string>("");
  const gridSection =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4";
  return (
    <>
      <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 mb-10">
        <h1 className="text-2xl font-bold mb-4">
          แบบบันทึกประวัติบุคคลที่เกี่ยวกับอาชญากรรม
        </h1>
        <h2 className="text-xl font-semibold mb-2">
          <strong>Police Data Center/PDC</strong>
        </h2>
        <p className="mb-6">
          ฝ่ายงานสืบสวน ภ.2 ภ.จว.ระยอง สถานีตำรวจภูธรเมืองระยอง
        </p>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="th"
          localeText={
            thaiLocaleText.components.MuiLocalizationProvider.defaultProps
              .localeText
          }
        >
          <form className="grid">
            <div className="col-span-full">
              หมายเลข : will get from the system
            </div>
            <GridSection>
              <DateTimePicker
                label="จัดทำเมื่อวันที่"
                format={dateTimeFormat}
              />
              <ComboBox
                label={"ประเภทบุคคลเกี่ยวข้องกับ"}
                options={personOptions}
                value={personType}
                onChange={setPersonType}
                variant={textFieldVaraint}
              />
              <TextField label="ประเภทความผิด" variant={textFieldVaraint} />
              <TextField label="ความผิดอื่นๆ" variant={textFieldVaraint} />
            </GridSection>

            <GridSection>
              <ComboBox
                label={"ระบุเพศ"}
                options={genderOptions}
                value={crimeGender}
                onChange={setCrimeGender}
                variant={textFieldVaraint}
              />
              <ComboBox
                label={"คำนำหน้า"}
                options={initialOptions}
                value={crimeInitial}
                onChange={setCrimeInitial}
                variant={textFieldVaraint}
              />
              <TextField
                label="ชื่อ"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="นามสกุล"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="นามแฝง"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <DatePicker label="วันเกิด" />
            </GridSection>
            <GridSection>
              <IdField
                label="เลขบัตรประชาชน"
                variant={textFieldVaraint}
                size={fieldSize}
                value={id}
                onChange={setId}
              />
              <TextField
                label="ที่อยู่ปัจจุบัน"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="อาชีพ"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="การศึกษา"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <PhoneField
                label="โทรศัพท์"
                variant={textFieldVaraint}
                size={fieldSize}
                value={phone}
                onChange={setPhone}
              />
            </GridSection>
            <GridSection>
              <TextField
                label="ประวัติการกระทำความผิด"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="อาวุธที่ใช้"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="ยานพาหนะที่ใช้"
                variant={textFieldVaraint}
                size={fieldSize}
              />
            </GridSection>
            <GridSection>
              <TextField
                label="เป็นผู้ต้องหาตามหมายจับ"
                variant={textFieldVaraint}
                size={fieldSize}
              />
            </GridSection>
            <GridSection>
              <TextField
                label="ผู้ร่วมกระทำความผิด"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <DatePicker label="วันเดือนปีที่จับกุม" />
              <TextField
                label="พื้นที่จับกุม (สน./สภ.)"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <TextField
                label="ลักษณะพิเศษ"
                variant={textFieldVaraint}
                size={fieldSize}
              />
            </GridSection>
            <GridSection>
              {" "}
              <TextField
                label="ชื่อ-สกุล ผู้เกี่ยวข้องเป็น"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <IdField
                label="เลขประจำตัวประชาชน"
                variant={textFieldVaraint}
                size={fieldSize}
                value={id}
                onChange={setId}
              />
            </GridSection>
            <GridSection>
              {" "}
              <ComboBox
                label={"เจ้าหน้าที่ตำรวจผู้บันทึก"}
                options={reporterOptions}
                value={reporter}
                onChange={setReporter}
                variant={textFieldVaraint}
              />
            </GridSection>
          </form>
        </LocalizationProvider>
      </div>
    </>
  );
}
