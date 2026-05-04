import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config';
import doctorModel from "./models/doctorModel.js";

// ─── Connect to MongoDB ───────────────────────────────────────────
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
};

// ─── Real Doctors from Rewa, Madhya Pradesh ───────────────────────
const rewaDoctors = [
    // ── General Physician (3) ──
    {
        name: "Dr. Umesh Pratap Singh",
        email: "umesh.singh@medisync.com",
        speciality: "General physician",
        degree: "MBBS, MD (Medicine)",
        experience: "10 Years",
        about: "Dr. Umesh Pratap Singh is a highly experienced general physician based in Rewa, MP. He specializes in internal medicine with a focus on preventive healthcare, chronic disease management, and evidence-based treatment. He is known for his thorough diagnostic approach and compassionate patient care at National Hospital & Research Centre, Rewa.",
        fees: 400,
        address: { line1: "National Hospital & Research Centre", line2: "Civil Lines, Rewa, MP 486001" }
    },
    {
        name: "Dr. Vivek Singh",
        email: "vivek.singh@medisync.com",
        speciality: "General physician",
        degree: "MBBS, MD (General Medicine)",
        experience: "8 Years",
        about: "Dr. Vivek Singh is a dedicated general physician practicing in Rewa. With expertise in diagnosing and treating a wide range of medical conditions, he emphasizes preventive care and patient education. He is associated with Vindhya Hospital and Research Centre and is well-regarded for his patient-first approach.",
        fees: 350,
        address: { line1: "Vindhya Hospital & Research Centre", line2: "Station Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Ashutosh Patel",
        email: "ashutosh.patel@medisync.com",
        speciality: "General physician",
        degree: "MBBS, DNB (Medicine)",
        experience: "6 Years",
        about: "Dr. Ashutosh Patel is a skilled general physician in Rewa known for his meticulous clinical evaluations and effective treatment plans. He manages conditions ranging from common infections to complex chronic diseases. He practices at Chirayu Hospital and Research Center, Rewa.",
        fees: 300,
        address: { line1: "Chirayu Hospital & Research Center", line2: "Pili Kothi, Rewa, MP 486001" }
    },

    // ── Gynecologist (3) ──
    {
        name: "Dr. Pooja Gangwar Patel",
        email: "pooja.patel@medisync.com",
        speciality: "Gynecologist",
        degree: "MBBS, MS (Obstetrics & Gynecology)",
        experience: "9 Years",
        about: "Dr. Pooja Gangwar Patel is a leading gynecologist and obstetrician in Rewa. She specializes in high-risk pregnancy management, laparoscopic gynecological surgeries, and infertility treatments. She is committed to providing comprehensive women's health care at Vardaan Hospital, Rewa.",
        fees: 500,
        address: { line1: "Vardaan Hospital", line2: "Collectorate Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Padma Shukla",
        email: "padma.shukla@medisync.com",
        speciality: "Gynecologist",
        degree: "MBBS, DGO, DNB (OBG)",
        experience: "15 Years",
        about: "Dr. Padma Shukla is a senior gynecologist practicing in Rewa with over 15 years of experience. She has expertise in normal and caesarean deliveries, management of gynecological disorders, and preventive women's health screenings. She is associated with Sanjay Gandhi Memorial Hospital, Rewa.",
        fees: 450,
        address: { line1: "Sanjay Gandhi Memorial Hospital", line2: "Medical College Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Vandna Singh",
        email: "vandna.singh@medisync.com",
        speciality: "Gynecologist",
        degree: "MBBS, MS (OBG)",
        experience: "7 Years",
        about: "Dr. Vandna Singh is a skilled obstetrician and gynecologist in Rewa. She provides comprehensive care for women across all stages of life, including prenatal care, delivery, and postpartum support. She practices at Rewa Hospital and Research Centre.",
        fees: 400,
        address: { line1: "Rewa Hospital & Research Centre", line2: "Jabalpur Road, Rewa, MP 486001" }
    },

    // ── Dermatologist (3) ──
    {
        name: "Dr. Priya Sharma",
        email: "priya.sharma@medisync.com",
        speciality: "Dermatologist",
        degree: "MBBS, MD (Dermatology, Venereology & Leprosy)",
        experience: "5 Years",
        about: "Dr. Priya Sharma is a skilled dermatologist in Rewa specializing in skin disorders, cosmetic dermatology, and laser treatments. She treats conditions including acne, eczema, psoriasis, and fungal infections with a focus on evidence-based care at Swastik Multi-Speciality Hospital.",
        fees: 400,
        address: { line1: "Swastik Multi-Speciality Hospital", line2: "University Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Ankit Gupta",
        email: "ankit.gupta@medisync.com",
        speciality: "Dermatologist",
        degree: "MBBS, DVD, FAAD",
        experience: "8 Years",
        about: "Dr. Ankit Gupta is a renowned dermatologist in Rewa with expertise in clinical and cosmetic dermatology. He provides advanced treatments for skin, hair, and nail conditions, including vitiligo, hair loss, and allergic skin diseases. He is associated with Apollo Spectra Hospital, Rewa.",
        fees: 500,
        address: { line1: "Apollo Spectra Hospital", line2: "Bypass Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Sunita Dwivedi",
        email: "sunita.dwivedi@medisync.com",
        speciality: "Dermatologist",
        degree: "MBBS, MD (Skin & VD)",
        experience: "12 Years",
        about: "Dr. Sunita Dwivedi is an experienced dermatologist practicing in Rewa. She specializes in treating chronic skin conditions, sexually transmitted infections, and performing cosmetic procedures. She is known for her approachable demeanor at Kushabhau Thakrey District Hospital.",
        fees: 350,
        address: { line1: "Kushabhau Thakrey District Hospital", line2: "Bichhiya, Rewa, MP 486001" }
    },

    // ── Pediatricians (3) ──
    {
        name: "Dr. Renu Singh",
        email: "renu.singh@medisync.com",
        speciality: "Pediatricians",
        degree: "MBBS, MD (Pediatrics)",
        experience: "10 Years",
        about: "Dr. Renu Singh is a trusted pediatrician in Rewa providing comprehensive care for children from birth through adolescence. She specializes in neonatal care, childhood vaccinations, growth monitoring, and management of common pediatric illnesses at National Hospital & Research Centre.",
        fees: 400,
        address: { line1: "National Hospital & Research Centre", line2: "Civil Lines, Rewa, MP 486001" }
    },
    {
        name: "Dr. Akhilesh Khare",
        email: "akhilesh.khare@medisync.com",
        speciality: "Pediatricians",
        degree: "MBBS, DCH, DNB (Pediatrics)",
        experience: "12 Years",
        about: "Dr. Akhilesh Khare is a senior pediatrician in Rewa with extensive experience in treating childhood diseases, developmental disorders, and emergency pediatric care. He is associated with Sanjay Gandhi Memorial Hospital and is well-known for his dedication to child health.",
        fees: 450,
        address: { line1: "Sanjay Gandhi Memorial Hospital", line2: "Medical College Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Anil Pandey",
        email: "anil.pandey@medisync.com",
        speciality: "Pediatricians",
        degree: "MBBS, MD (Pediatrics), Fellowship (Neonatology)",
        experience: "8 Years",
        about: "Dr. Anil Pandey is a pediatrician and neonatologist practicing in Rewa. He has special expertise in newborn intensive care, premature baby management, and pediatric infectious diseases. He provides compassionate care at Chirayu Hospital and Research Center.",
        fees: 500,
        address: { line1: "Chirayu Hospital & Research Center", line2: "Pili Kothi, Rewa, MP 486001" }
    },

    // ── Neurologist (3) ──
    {
        name: "Dr. Sompal Jindal",
        email: "sompal.jindal@medisync.com",
        speciality: "Neurologist",
        degree: "MBBS, MS (Surgery), MCh (Neurosurgery)",
        experience: "14 Years",
        about: "Dr. Sompal Jindal is one of the most experienced neurosurgeons in Rewa. He specializes in brain and spine surgeries, neurotrauma management, and treatment of neurological disorders. He is a key consultant at Rewa Hospital and Research Centre and has performed hundreds of complex neurosurgical procedures.",
        fees: 800,
        address: { line1: "Rewa Hospital & Research Centre", line2: "Jabalpur Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Dheerendra Mishra",
        email: "dheerendra.mishra@medisync.com",
        speciality: "Neurologist",
        degree: "MBBS, MD (Psychiatry), DM (Neurology)",
        experience: "10 Years",
        about: "Dr. Dheerendra Mishra is a distinguished neurologist and psychiatrist in Rewa. He specializes in epilepsy, stroke, headache disorders, neurodegenerative diseases, and mental health conditions. He combines neurological and psychiatric expertise for holistic patient care at Vindhya Hospital.",
        fees: 600,
        address: { line1: "Vindhya Hospital & Research Centre", line2: "Station Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Rajesh Tiwari",
        email: "rajesh.tiwari@medisync.com",
        speciality: "Neurologist",
        degree: "MBBS, DM (Neurology)",
        experience: "7 Years",
        about: "Dr. Rajesh Tiwari is a neurologist practicing in Rewa with expertise in diagnosing and treating disorders of the nervous system. He manages conditions including migraines, seizures, neuropathies, and movement disorders at Baderia's MetroPrime Multispeciality Hospital.",
        fees: 550,
        address: { line1: "Baderia's MetroPrime Multispeciality Hospital", line2: "NH-7, Rewa, MP 486001" }
    },

    // ── Gastroenterologist (3) ──
    {
        name: "Dr. M.H. Ushmani",
        email: "mh.ushmani@medisync.com",
        speciality: "Gastroenterologist",
        degree: "MBBS, MD (Medicine), DM (Gastroenterology)",
        experience: "16 Years",
        about: "Dr. M.H. Ushmani is a leading gastroenterologist in Rewa with over 16 years of experience. He specializes in endoscopy, colonoscopy, liver diseases, and management of complex gastrointestinal disorders. He is a senior consultant at Rewa Hospital and Research Centre and is highly regarded in the Vindhya region.",
        fees: 700,
        address: { line1: "Rewa Hospital & Research Centre", line2: "Jabalpur Road, Rewa, MP 486001" }
    },
    {
        name: "Dr. Ravi Pratap Singh",
        email: "ravi.singh@medisync.com",
        speciality: "Gastroenterologist",
        degree: "MBBS, MS (Surgery), FIAGES",
        experience: "11 Years",
        about: "Dr. Ravi Pratap Singh is a skilled GI and minimal access surgeon in Rewa. He specializes in laparoscopic surgeries, gastrointestinal surgeries, and general surgical procedures. He brings precision and expertise to complex cases at National Hospital & Research Centre.",
        fees: 600,
        address: { line1: "National Hospital & Research Centre", line2: "Civil Lines, Rewa, MP 486001" }
    },
];

// ─── Seed Function ────────────────────────────────────────────────
const seedDoctors = async () => {
    try {
        await connectDB();

        const defaultPassword = "Doctor@123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);

        let added = 0;
        let skipped = 0;

        for (const doc of rewaDoctors) {
            // Check if doctor with this email already exists
            const exists = await doctorModel.findOne({ email: doc.email });
            if (exists) {
                console.log(`⏭️  Skipped (already exists): ${doc.name}`);
                skipped++;
                continue;
            }

            // Generate avatar URL using ui-avatars.com
            const encodedName = encodeURIComponent(doc.name.replace("Dr. ", ""));
            const imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&size=300&background=5F6FFF&color=fff&bold=true&format=png`;

            const doctorData = {
                name: doc.name,
                email: doc.email,
                password: hashedPassword,
                image: imageUrl,
                speciality: doc.speciality,
                degree: doc.degree,
                experience: doc.experience,
                about: doc.about,
                available: true,
                fees: doc.fees,
                slots_booked: {},
                address: doc.address,
                date: Date.now(),
            };

            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
            console.log(`✅ Added: ${doc.name} (${doc.speciality})`);
            added++;
        }

        console.log(`\n🎉 Seeding complete! Added: ${added}, Skipped: ${skipped}`);
        console.log(`📋 Total doctors in DB: ${await doctorModel.countDocuments()}`);

    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
};

seedDoctors();
