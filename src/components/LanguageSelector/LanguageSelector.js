import React from 'react'

const LanguageSelector = ({ chapterLang, availableTranslatedLanguages, handleChapterLang }) => (
    <div className='px-6 mt-6'>
        <select
            value={chapterLang}
            className="px-2 md:pl-4 md:pr-12 text-[10px] md:text-[20px] py-2 bg-white text-black rounded"
            onChange={handleChapterLang}
        >
            {availableTranslatedLanguages.map((lang) => (
                <option key={lang}>{lang}</option>
            ))}
        </select>
    </div>
);

export default LanguageSelector