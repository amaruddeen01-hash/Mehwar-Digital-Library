import { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [language, setLanguage] = useState("ur");

  const content = {
    ur: {
      title: "مہور ڈیجیٹل لائبریری کے بارے میں",
      intro:
        "مہور ڈیجیٹل لائبریری ایک آن لائن ڈیجیٹل لائبریری ہے جس کا مقصد اسلامی اور تعلیمی علم کو ڈیجیٹل شکل میں آسان اور بہتر طریقے سے لوگوں تک پہنچانا ہے۔",

      aboutTitle: "🌙 ہمارے بارے میں",
      about1:
        "مہور ڈیجیٹل لائبریری ایک ڈیجیٹل پلیٹ فارم ہے جہاں اردو، عربی، ہندی اور انگریزی میں اسلامی کتب اور تعلیمی مواد کو ایک جگہ فراہم کرنے کی کوشش کی گئی ہے۔ ہمارا مقصد کتابوں اور علم تک ڈیجیٹل رسائی کو آسان بنانا ہے تاکہ قارئین اپنی ضرورت کے مطابق کتب کو آن لائن پڑھ سکیں اور دستیاب مواد کو ڈاؤن لوڈ کر سکیں۔",
      about2:
        "یہ لائبریری طلبہ، اساتذہ، محققین اور اسلامی ادب میں دلچسپی رکھنے والے قارئین کے لیے ایک مفید ڈیجیٹل ذریعہ بننے کی کوشش کر رہی ہے۔",

      missionTitle: "🎯 ہمارا مقصد",
      mission:
        "اسلامی اور تعلیمی کتب کو ڈیجیٹل شکل میں منظم کرکے قارئین کے لیے آسان رسائی فراہم کرنا اور علم کے مطالعے کو فروغ دینا ہمارا بنیادی مقصد ہے۔",

      visionTitle: "🌍 ہماری سوچ",
      vision:
        "ہماری کوشش ہے کہ ڈیجیٹل ٹیکنالوجی کے ذریعے اسلامی لٹریچر اور تعلیمی مواد کو زیادہ سے زیادہ لوگوں تک آسان طریقے سے پہنچایا جا سکے۔",

      libraryTitle: "📖 لائبریری میں کیا ملے گا؟",
      items: [
        "📚 اسلامی کتب",
        "🕌 اردو اور عربی ادب",
        "🎓 تعلیمی مواد",
        "🔎 آسان کتاب سرچ",
        "📖 آن لائن PDF مطالعہ",
        "📥 دستیاب کتب ڈاؤن لوڈ",
      ],

      languagesTitle: "🌐 دستیاب زبانیں",
      contactTitle: "🤝 ہم سے رابطہ کریں",
      contact:
        "اگر آپ کے پاس لائبریری کے حوالے سے کوئی سوال، مشورہ، رائے یا مواد سے متعلق معلومات ہوں تو ہم سے رابطہ کر سکتے ہیں۔",
      contactButton: "📞 رابطہ کریں",
    },

    en: {
      title: "About Mehwar Digital Library",
      intro:
        "Mehwar Digital Library is an online digital library dedicated to making Islamic and educational knowledge easily accessible in digital form.",

      aboutTitle: "🌙 About Us",
      about1:
        "Mehwar Digital Library is a digital platform that brings together Islamic books and educational resources in Urdu, Arabic, Hindi, and English. Our aim is to make access to books and knowledge easier so that readers can read books online and download available resources.",
      about2:
        "The library aims to serve students, teachers, researchers, and readers interested in Islamic literature as a useful digital resource.",

      missionTitle: "🎯 Our Mission",
      mission:
        "Our mission is to organize Islamic and educational books in digital form, make them easily accessible to readers, and encourage the study and sharing of knowledge.",

      visionTitle: "🌍 Our Vision",
      vision:
        "Our vision is to use digital technology to make Islamic literature and educational resources accessible to more people in a simple and convenient way.",

      libraryTitle: "📖 What You Can Find",
      items: [
        "📚 Islamic Books",
        "🕌 Urdu & Arabic Literature",
        "🎓 Educational Resources",
        "🔎 Easy Book Search",
        "📖 Online PDF Reading",
        "📥 Available Book Downloads",
      ],

      languagesTitle: "🌐 Available Languages",
      contactTitle: "🤝 Contact Us",
      contact:
        "If you have any questions, suggestions, feedback, or information related to the library or its content, you can contact us.",
      contactButton: "📞 Contact Us",
    },

    hi: {
      title: "मेहवर डिजिटल लाइब्रेरी के बारे में",
      intro:
        "मेहवर डिजिटल लाइब्रेरी एक ऑनलाइन डिजिटल लाइब्रेरी है, जिसका उद्देश्य इस्लामी और शैक्षिक ज्ञान को डिजिटल रूप में आसान और बेहतर तरीके से लोगों तक पहुँचाना है।",

      aboutTitle: "🌙 हमारे बारे में",
      about1:
        "मेहवर डिजिटल लाइब्रेरी एक डिजिटल प्लेटफॉर्म है जहाँ उर्दू, अरबी, हिंदी और अंग्रेज़ी में इस्लामी किताबों और शैक्षिक सामग्री को एक जगह उपलब्ध कराने की कोशिश की गई है। हमारा उद्देश्य किताबों और ज्ञान तक डिजिटल पहुँच को आसान बनाना है ताकि पाठक अपनी आवश्यकता के अनुसार किताबें ऑनलाइन पढ़ सकें और उपलब्ध सामग्री डाउनलोड कर सकें।",
      about2:
        "यह लाइब्रेरी छात्रों, शिक्षकों, शोधकर्ताओं और इस्लामी साहित्य में रुचि रखने वाले पाठकों के लिए एक उपयोगी डिजिटल संसाधन बनने की कोशिश कर रही है।",

      missionTitle: "🎯 हमारा उद्देश्य",
      mission:
        "इस्लामी और शैक्षिक किताबों को डिजिटल रूप में व्यवस्थित करके पाठकों के लिए आसान पहुँच प्रदान करना और ज्ञान के अध्ययन को बढ़ावा देना हमारा मुख्य उद्देश्य है।",

      visionTitle: "🌍 हमारी सोच",
      vision:
        "हमारी कोशिश है कि डिजिटल तकनीक के माध्यम से इस्लामी साहित्य और शैक्षिक सामग्री को अधिक से अधिक लोगों तक आसान तरीके से पहुँचाया जा सके।",

      libraryTitle: "📖 लाइब्रेरी में क्या मिलेगा?",
      items: [
        "📚 इस्लामी किताबें",
        "🕌 उर्दू और अरबी साहित्य",
        "🎓 शैक्षिक सामग्री",
        "🔎 आसान पुस्तक खोज",
        "📖 ऑनलाइन PDF पढ़ना",
        "📥 उपलब्ध किताबें डाउनलोड करना",
      ],

      languagesTitle: "🌐 उपलब्ध भाषाएँ",
      contactTitle: "🤝 हमसे संपर्क करें",
      contact:
        "यदि आपके पास लाइब्रेरी के बारे में कोई सवाल, सुझाव, प्रतिक्रिया या सामग्री से संबंधित जानकारी हो तो आप हमसे संपर्क कर सकते हैं।",
      contactButton: "📞 संपर्क करें",
    },
  };

  const t = content[language];

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📚</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
          {t.title}
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-8">
          {t.intro}
        </p>
      </div>

      {/* Language Selector */}
      <div
        className="flex justify-center flex-wrap gap-3 mb-10"
        dir="ltr"
      >
        <button
          onClick={() => setLanguage("ur")}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            language === "ur"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
          }`}
        >
          اردو
        </button>

        <button
          onClick={() => setLanguage("en")}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            language === "en"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("hi")}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            language === "hi"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
          }`}
        >
          हिन्दी
        </button>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-10 mb-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">
          {t.aboutTitle}
        </h2>

        <p className="text-gray-600 leading-8">
          {t.about1}
        </p>

        <p className="text-gray-600 leading-8 mt-4">
          {t.about2}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8">
          <div className="text-4xl mb-4">🎯</div>

          <h2 className="text-2xl font-bold text-emerald-700 mb-3">
            {t.missionTitle}
          </h2>

          <p className="text-gray-600 leading-7">
            {t.mission}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
          <div className="text-4xl mb-4">🌍</div>

          <h2 className="text-2xl font-bold text-blue-700 mb-3">
            {t.visionTitle}
          </h2>

          <p className="text-gray-600 leading-7">
            {t.vision}
          </p>
        </div>

      </div>

      {/* Library Features */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-10 mb-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">
          {t.libraryTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 text-gray-700 font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-emerald-700 text-white rounded-2xl p-6 sm:p-10 mb-8">
        <h2 className="text-2xl font-bold mb-5">
          {t.languagesTitle}
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="bg-white/15 px-5 py-2 rounded-full">
            اردو
          </span>

          <span className="bg-white/15 px-5 py-2 rounded-full">
            العربية
          </span>

          <span className="bg-white/15 px-5 py-2 rounded-full">
            हिन्दी
          </span>

          <span className="bg-white/15 px-5 py-2 rounded-full">
            English
          </span>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center bg-gray-50 border rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {t.contactTitle}
        </h2>

        <p className="text-gray-600 leading-7 max-w-2xl mx-auto">
          {t.contact}
        </p>

        <Link
          to="/contact"
          className="inline-block mt-6 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          {t.contactButton}
        </Link>
      </div>
    </div>
  );
}