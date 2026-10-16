import React from "react";
import { SKILL_CATEGORIES } from "../config/data";
import {
  SiC, SiCplusplus, SiTensorflow, SiScikitlearn, SiArduino, SiStmicroelectronics, SiEspressif, SiMqtt,
} from "react-icons/si";
import {
  FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaWifi, FaNetworkWired, FaMicrosoft,
} from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { BsCpu, BsMotherboard } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { TbBrain, TbCpu } from "react-icons/tb";
import { IconType } from "react-icons";
import SectionHeading from "./ui/SectionHeading";

const ICONS: Record<string, IconType> = {
  SiC, SiCplusplus, FaPython, FaHtml5, FaCss3Alt, FaJsSquare, DiMysql,
  SiEspressif, SiStmicroelectronics, SiArduino, BsCpu, SiMqtt, FaWifi, BsMotherboard, FaNetworkWired,
  SiTensorflow, TbCpu, SiScikitlearn, TbBrain,
  MdDesignServices, FaMicrosoft,
};

// Map strings to actual icon components
const IconResolver = ({ name }: { name: string | undefined }) => {
  const IconComponent = (name && ICONS[name]) || BsCpu;
  return <IconComponent className="text-lg md:text-xl" />;
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading index="06" title="Technical Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={category.title}
              className="bg-[#0a0f1d] border border-[#1e293b] p-6 rounded-lg shadow-lg relative overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2.5 md:gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-[#0f172a] border border-[#334155] px-3 md:px-4 py-2 rounded text-sm text-[#cbd5e1] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors cursor-default"
                  >
                    <IconResolver name={skill.icon} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
