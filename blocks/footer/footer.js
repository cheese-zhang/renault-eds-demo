import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  // render the country choose block
  block.textContent = '';
  block.append(fragment.firstElementChild);
  // decorate footer DOM
  const footerContainer = document.createElement('div');
  footerContainer.className = 'c-footer u-global-margin';

  while (fragment.firstElementChild) {
    const section = fragment.firstElementChild;
    const footerContent = section.cloneNode(true);
    section.className = 'c-footer__content';

    section.textContent = '';

    const footerUlElement = footerContent.querySelector('div > ul');

    switch (footerContent.getAttribute('data-position')) {
      case 'first':
        // deal logo
        // eslint-disable-next-line no-case-declarations
        const footerLogo = footerContent.querySelector('div > p > a');
        if (footerLogo) {
          const footerLogoContainer = document.createElement('div');
          footerLogoContainer.id = 'block-marquedusite';
          footerLogoContainer.append(footerLogo);
          section.append(footerLogoContainer);
        }
        if (footerUlElement) {
          footerUlElement.className = 'u-list';
          section.append(footerUlElement);
        }
        footerUlElement.classList.add('c-footer__link');
        // eslint-disable-next-line no-case-declarations
        const footerPElement = footerContent.querySelector('div > p:last-child');
        if (footerPElement) {
          const footerSlogan = document.createElement('div');
          footerSlogan.className = 'c-footer__slogan';
          footerSlogan.textContent = footerPElement.textContent;
          section.append(footerSlogan);
        }
        break;
      case 'last':
        if (footerUlElement) {
          footerUlElement.className = 'u-list';
          section.append(footerUlElement);
        }
        footerUlElement.classList.add('c-footer__social-icons');
        section.classList.add('last-item');
        // eslint-disable-next-line no-case-declarations
        const footerIconsUl = section.querySelectorAll('ul > li');
        footerIconsUl.forEach((liElement) => {
          liElement.querySelector('span').className = '';
          liElement.querySelector('img').className = 'icon';
          const separator = document.createElement('i');
          separator.className = 'separator';
          liElement.append(separator);
        });
        // add contact and other buttons
        // eslint-disable-next-line no-case-declarations
        const footerCopyright = document.createElement('div');
        footerCopyright.className = 'c-footer__copyright c-contact-btn';
        // eslint-disable-next-line no-case-declarations
        const titles = footerContent.querySelectorAll('p');
        // eslint-disable-next-line no-case-declarations
        const links = footerContent.querySelectorAll('p > a');
        // eslint-disable-next-line no-case-declarations
        const icons = footerContent.querySelectorAll('p > a > span > img');
        links.forEach((link, i) => {
          link.textContent = titles[i].textContent;
          link.append(icons[i]);
          footerCopyright.append(link);
        });
        section.querySelector('ul')
          .after(footerCopyright);
        break;
      default:
        if (footerUlElement) {
          footerUlElement.className = 'u-list';
          section.append(footerUlElement);
        }
        footerUlElement.classList.add('c-footer__link');
        break;
    }
    footerContainer.append(section);
  }
  block.append(footerContainer);
}
