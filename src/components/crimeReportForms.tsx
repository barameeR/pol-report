"use client";
import { useState } from "react";
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
import InputFileUpload from "./intputUploadFile";
import { v4 as uuid } from "uuid";

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

const thaiLocaleTextDefaultProps =
  thaiLocaleText.components.MuiLocalizationProvider.defaultProps.localeText;

const dateTimeFormat = "DD MMM YYYY HH:mm"; // Thai date format
const dateFormat = "DD MMM YYYY"; // Thai date format for DatePicker
const textFieldVaraint = "standard"; // Standard variant for TextField
const fieldSize = "small"; // Small size for TextField

export default function CrimeReportForm() {
  const personOptions = ["ทำประวัติ", "ความผิดต่อชีวิต", "ความผิดต่อร่างกาย"];
  const genderOptions = ["ชาย", "หญิง", "LGBTQ+", "ไม่ระบุ"];
  const initialOptions = ["นาย", "นาง", "นางสาว", "ไม่ระบุ"];
  const reporterOptions = ["ด.ต.สมชาย", "ร.ต.อ.หญิง สุรีย์พร", "พ.ต.ท.อดิศร"];
  const imangeInitialPrefix = "crime-image-";
  const [crimeIdNumber, setCrimeIdNumber] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [reporter, setReporter] = useState<string>("");
  const [personType, setPersonType] = useState<string>("");
  const [crimeGender, setCrimeGender] = useState<string>("");
  const [crimeInitial, setCrimeInitial] = useState<string>("");
  const [images, setImages] = useState<Record<string, File>>({});
  const [relatedPersonIdNumber, setRelatedPersonIdNumber] =
    useState<string>("");

  function handleOnChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const newImages: Record<string, File> = {};
      Array.from(files).forEach((file) => {
        const key = `${imangeInitialPrefix}-${uuid()}`; // Generate a unique key for each file
        newImages[key] = file;
      });
      setImages((prev) => ({ ...prev, ...newImages }));
    }
  }

  function handleOnDeleteImage(id: string) {
    setImages((prev) => {
      const newImages = { ...prev };
      delete newImages[id];
      return newImages;
    });
  }
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
          localeText={thaiLocaleTextDefaultProps}
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
              <DatePicker label="วันเกิด" format={dateFormat} />
            </GridSection>
            <GridSection>
              <IdField
                label="เลขบัตรประชาชน"
                variant={textFieldVaraint}
                size={fieldSize}
                value={crimeIdNumber}
                onChange={setCrimeIdNumber}
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
              <DatePicker label="วันเดือนปีที่จับกุม" format={dateFormat} />
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
              <TextField
                label="ชื่อ-สกุล ผู้เกี่ยวข้องเป็น"
                variant={textFieldVaraint}
                size={fieldSize}
              />
              <IdField
                label="เลขประจำตัวประชาชน"
                variant={textFieldVaraint}
                size={fieldSize}
                value={relatedPersonIdNumber}
                onChange={setRelatedPersonIdNumber}
              />
            </GridSection>
            <GridSection>
              <ComboBox
                label={"เจ้าหน้าที่ตำรวจผู้บันทึก"}
                options={reporterOptions}
                value={reporter}
                onChange={setReporter}
                variant={textFieldVaraint}
              />
            </GridSection>
            <GridSection>
              <InputFileUpload
                className="col-span-full"
                label="แนบรูปภาพ"
                onChange={handleOnChangeImage}
                onDelete={handleOnDeleteImage}
                value={images}
                accept="image/*"
                multiple={true}
              />
            </GridSection>
          </form>
        </LocalizationProvider>
      </div>
    </>
  );
}
