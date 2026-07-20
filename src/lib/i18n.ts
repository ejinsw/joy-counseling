export type Locale = 'en' | 'kr';
export type PrismicLocale = 'en-us' | 'ko-kr';

export const defaultLocale: Locale = 'en';
export const koreanLocale: Locale = 'kr';

type UiText = {
	language: {
		switcherLabel: string;
		english: string;
		korean: string;
	};
	nav: {
		home: string;
		about: string;
		contact: string;
		schedule: string;
		mainNavigation: string;
		toggleNavigation: string;
	};
	common: {
		close: string;
		modalBrand: string;
		details: string;
		readMore: string;
		ctaIntro: string;
	};
	footer: {
		pages: string;
		contact: string;
		untitled: string;
		copyrightSuffix: string;
		legal: {
			privacy: string;
			terms: string;
			hipaa: string;
		};
	};
	contactForm: {
		firstName: string;
		firstNamePlaceholder: string;
		lastName: string;
		lastNamePlaceholder: string;
		email: string;
		emailPlaceholder: string;
		phone: string;
		phonePlaceholder: string;
		service: string;
		selectService: string;
		insuranceQuestion: string;
		selectOption: string;
		yes: string;
		no: string;
		notSure: string;
		insuranceProvider: string;
		message: string;
		messagePlaceholder: string;
		consent: string;
		submitting: string;
		sendMessage: string;
		scheduleTitle: string;
		formOptionTitle: string;
		headwayOptionTitle: string;
		headwayAria: string;
		backToOptions: string;
		failure: string;
		successTitle: string;
		successBody: string;
		nextTitle: string;
		nextBody: string;
	};
};

export const uiText: Record<Locale, UiText> = {
	en: {
		language: {
			switcherLabel: 'Switch language',
			english: 'English',
			korean: 'Korean'
		},
		nav: {
			home: 'Home',
			about: 'About Us',
			contact: 'Contact',
			schedule: 'Schedule',
			mainNavigation: 'Main navigation',
			toggleNavigation: 'Toggle navigation menu'
		},
		common: {
			close: 'Close',
			modalBrand: 'J.O.Y. Counseling',
			details: 'Details',
			readMore: 'Read more',
			ctaIntro: "We've made getting started easy."
		},
		footer: {
			pages: 'Pages',
			contact: 'Contact',
			untitled: 'Untitled',
			copyrightSuffix: 'All rights reserved.',
			legal: {
				privacy: 'Privacy Policy',
				terms: 'Terms of Service',
				hipaa: 'HIPAA Notice'
			}
		},
		contactForm: {
			firstName: 'First Name',
			firstNamePlaceholder: 'Your first name',
			lastName: 'Last Name',
			lastNamePlaceholder: 'Your last name',
			email: 'Email Address',
			emailPlaceholder: 'your.email@example.com',
			phone: 'Phone Number',
			phonePlaceholder: '(555) 123-4567',
			service: 'Service',
			selectService: 'Select a service',
			insuranceQuestion: 'Do you have insurance?',
			selectOption: 'Select an option',
			yes: 'Yes',
			no: 'No',
			notSure: 'Not sure',
			insuranceProvider: 'Insurance Provider',
			message: 'Message',
			messagePlaceholder: "Please share what's bringing you to seek counseling support.",
			consent:
				'I understand that this form is secure and my information will be kept confidential. I consent to being contacted about scheduling an appointment.',
			submitting: 'Submitting...',
			sendMessage: 'Send Message',
			scheduleTitle: 'Choose how to schedule',
			formOptionTitle: 'Manual',
			headwayOptionTitle: 'Continue with Headway',
			headwayAria: 'Schedule counseling through Headway',
			backToOptions: 'Back',
			failure: 'Failed to send message. Please try again or contact us directly.',
			successTitle: 'Thank You for Reaching Out',
			successBody:
				"We've received your message and will respond within 24 hours. Taking this step shows real strength.",
			nextTitle: "What's next?",
			nextBody:
				"We'll review your message and reach out to schedule a brief consultation where we can discuss your needs and answer any questions."
		}
	},
	kr: {
		language: {
			switcherLabel: '언어 선택',
			english: '영어',
			korean: '한국어'
		},
		nav: {
			home: '홈',
			about: '소개',
			contact: '문의',
			schedule: '예약',
			mainNavigation: '주요 내비게이션',
			toggleNavigation: '메뉴 열기'
		},
		common: {
			close: '닫기',
			modalBrand: '조이 상담 센터',
			details: '자세히',
			readMore: '더 보기',
			ctaIntro: '시작하실 수 있도록 쉽게 준비했습니다.'
		},
		footer: {
			pages: '페이지',
			contact: '문의',
			untitled: '제목 없음',
			copyrightSuffix: '모든 권리 보유.',
			legal: {
				privacy: '개인정보 처리방침',
				terms: '이용 약관',
				hipaa: 'HIPAA 안내'
			}
		},
		contactForm: {
			firstName: '이름',
			firstNamePlaceholder: '이름',
			lastName: '성',
			lastNamePlaceholder: '성',
			email: '이메일 주소',
			emailPlaceholder: 'name@example.com',
			phone: '전화번호',
			phonePlaceholder: '(555) 123-4567',
			service: '상담 서비스',
			selectService: '서비스를 선택하세요',
			insuranceQuestion: '보험이 있으신가요?',
			selectOption: '선택하세요',
			yes: '예',
			no: '아니요',
			notSure: '잘 모르겠습니다',
			insuranceProvider: '보험사',
			message: '메시지',
			messagePlaceholder: '상담을 찾게 된 이유를 편하게 적어 주세요.',
			consent:
				'이 양식이 안전하게 처리되며 제 정보가 기밀로 보호된다는 점을 이해합니다. 예약 안내를 위해 연락받는 것에 동의합니다.',
			submitting: '전송 중...',
			sendMessage: '보내기',
			scheduleTitle: '예약 방법을 선택해 주세요',
			formOptionTitle: '직접 문의',
			headwayOptionTitle: 'Headway로 진행하기',
			headwayAria: 'Headway에서 상담 예약하기',
			backToOptions: '뒤로',
			failure: '메시지를 보내지 못했습니다. 다시 시도하시거나 직접 연락해 주세요.',
			successTitle: '문의해 주셔서 감사합니다',
			successBody:
				'메시지를 받았습니다. 24시간 이내에 연락드리겠습니다. 이 첫걸음은 큰 용기입니다.',
			nextTitle: '다음 단계',
			nextBody:
				'메시지를 확인한 뒤 간단한 상담 일정을 잡기 위해 연락드리겠습니다. 필요와 궁금한 점을 함께 나눌 수 있습니다.'
		}
	}
};

export function localeFromPath(pathname: string): Locale {
	return pathname === '/kr' || pathname.startsWith('/kr/') ? 'kr' : 'en';
}

export function prismicLocale(locale: Locale): PrismicLocale {
	return locale === 'kr' ? 'ko-kr' : 'en-us';
}

export function localizedPath(pathname: string, locale: Locale): string {
	const withoutKoreanPrefix =
		pathname === '/kr' ? '/' : pathname.startsWith('/kr/') ? pathname.slice(3) || '/' : pathname;

	if (locale === 'kr') {
		return withoutKoreanPrefix === '/' ? '/kr' : `/kr${withoutKoreanPrefix}`;
	}

	return withoutKoreanPrefix;
}
