'use client';

import { Button } from '@/components/ui/Button';
import { Section, Container } from '@/components/ui/Layout';

export function HeroSection() {
  return (
    <Section className="bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-[2em] text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
            Scorly
          </h1>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Score Any Tokenized Real-World Asset in Seconds
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Upload project data or paste a link.<br />Get a&nbsp;full audit-style score and&nbsp;risk report powered by&nbsp;AI.
          </p>
        </div>
      </Container>
    </Section>
  );
}
