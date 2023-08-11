import { apiUrl } from './global-settings.js';

function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
      case "A page on this site":
        return (onSiteLink);
      case "Another site":
        return (offSiteLink);
      case "A file":
        return (fileLink);
      default:
        return ('/');
    }
}

export default async function NotFound() {

    async function getPage() {
        const res = await fetch(apiUrl + `/pages/all/404-page`)
        if (!res.ok) {
            throw Error(res.statusText);
        } else {
            return res.json();
        }
    }

    const _page = getPage();
    const pageData = await _page;

    let heroButtonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
   
    return (
        <>
            <div className="four-o-four-content">
                <div className="four-o-four-wrapper">
                <h1 className="four-o-four-title">{pageData.acf.hero_section.title}</h1>
                <p className="four-o-four-paragraph">{pageData.acf.hero_section.description}</p>
                <a href={heroButtonLink}>
                    <div className="button">{pageData.acf.hero_section.button.text}</div>
                </a>
                </div>
            </div>
        </>
    );
}