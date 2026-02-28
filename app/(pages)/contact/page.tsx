import { css } from '@/styled-system/css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for a free consultation on sustainable web services.',
};

export default function ContactPage() {
  return (
    <div className={css({ bg: 'white' })}>
      {/* Hero Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'gray.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        })}
        aria-label="Contact us"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            Get in Touch
          </h1>
          <p className={css({ fontSize: 'lg', color: 'gray.600' })}>
            Schedule a free consultation to discuss how we can help optimize your digital products.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
        })}
      >
        <div
          className={css({
            maxW: '2xl',
            mx: 'auto',
          })}
        >
          <form
            name="contact"
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            })}
          >
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot field */}
            <div className={css({ display: 'none' })}>
              <label htmlFor="bot-field">Don't fill this out</label>
              <input id="bot-field" name="bot-field" />
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className={css({
                  display: 'block',
                  mb: '0.5rem',
                  fontWeight: '600',
                  color: 'gray.900',
                })}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={css({
                  width: '100%',
                  px: '1rem',
                  py: '0.75rem',
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontSize: 'base',
                  transition: 'border-color',
                  _focus: {
                    outline: 'none',
                    borderColor: 'green.600',
                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                  },
                })}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={css({
                  display: 'block',
                  mb: '0.5rem',
                  fontWeight: '600',
                  color: 'gray.900',
                })}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={css({
                  width: '100%',
                  px: '1rem',
                  py: '0.75rem',
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontSize: 'base',
                  transition: 'border-color',
                  _focus: {
                    outline: 'none',
                    borderColor: 'green.600',
                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                  },
                })}
              />
            </div>

            {/* Company Field */}
            <div>
              <label
                htmlFor="company"
                className={css({
                  display: 'block',
                  mb: '0.5rem',
                  fontWeight: '600',
                  color: 'gray.900',
                })}
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className={css({
                  width: '100%',
                  px: '1rem',
                  py: '0.75rem',
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontSize: 'base',
                  transition: 'border-color',
                  _focus: {
                    outline: 'none',
                    borderColor: 'green.600',
                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                  },
                })}
              />
            </div>

            {/* Service Interest */}
            <div>
              <label
                htmlFor="service"
                className={css({
                  display: 'block',
                  mb: '0.5rem',
                  fontWeight: '600',
                  color: 'gray.900',
                })}
              >
                What service interests you?
              </label>
              <select
                id="service"
                name="service"
                className={css({
                  width: '100%',
                  px: '1rem',
                  py: '0.75rem',
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontSize: 'base',
                  bg: 'white',
                  cursor: 'pointer',
                  transition: 'border-color',
                  _focus: {
                    outline: 'none',
                    borderColor: 'green.600',
                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                  },
                })}
              >
                <option value="">Select a service</option>
                <option value="audit">Digital Footprint Audit</option>
                <option value="architecture">Architecture Consulting</option>
                <option value="devops">Green DevOps & CI/CD</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className={css({
                  display: 'block',
                  mb: '0.5rem',
                  fontWeight: '600',
                  color: 'gray.900',
                })}
              >
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className={css({
                  width: '100%',
                  px: '1rem',
                  py: '0.75rem',
                  border: '1px solid',
                  borderColor: 'gray.300',
                  borderRadius: 'md',
                  fontSize: 'base',
                  fontFamily: 'inherit',
                  transition: 'border-color',
                  resize: 'vertical',
                  _focus: {
                    outline: 'none',
                    borderColor: 'green.600',
                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                  },
                })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={css({
                px: '2rem',
                py: '0.75rem',
                bg: 'green.600',
                color: 'white',
                fontWeight: '600',
                borderRadius: 'lg',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'base',
                transition: 'background-color',
                _hover: { bg: 'green.700' },
                _focus: {
                  outline: 'none',
                  ring: '2px',
                  ringColor: 'green.500',
                  ringOffset: '2px',
                },
              })}
            >
              Send Message
            </button>

            <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
              We'll get back to you within 24 hours.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
