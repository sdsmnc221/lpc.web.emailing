// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type FoliopageDocumentDataSlicesSlice =
  | SocialMediasBlockSlice
  | HeroSlice
  | LogoBannerSlice
  | HeaderWithTextSlice;

/**
 * Content for FolioPage documents
 */
interface FoliopageDocumentData {
  /**
   * SubscribleBlock field in *FolioPage*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: foliopage.subscribleblock
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  subscribleblock: prismic.ContentRelationshipField<"subscribenewsletter">;

  /**
   * Slice Zone field in *FolioPage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: foliopage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<FoliopageDocumentDataSlicesSlice> /**
   * Meta Title field in *FolioPage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: foliopage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *FolioPage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: foliopage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *FolioPage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: foliopage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * FolioPage document from Prismic
 *
 * - **API ID**: `foliopage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FoliopageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<FoliopageDocumentData>,
    "foliopage",
    Lang
  >;

/**
 * Item in *SubscribeNewsletter → FormInputs*
 */
export interface SubscribenewsletterDocumentDataForminputsItem {
  /**
   * Input Label field in *SubscribeNewsletter → FormInputs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.forminputs[].input_label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  input_label: prismic.KeyTextField;

  /**
   * IsMandatory field in *SubscribeNewsletter → FormInputs*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: subscribenewsletter.forminputs[].ismandatory
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  ismandatory: prismic.BooleanField;
}

/**
 * Item in *SubscribeNewsletter → Segmentations*
 */
export interface SubscribenewsletterDocumentDataSegmentationsItem {
  /**
   * Topic field in *SubscribeNewsletter → Segmentations*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.segmentations[].topic
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  topic: prismic.KeyTextField;
}

/**
 * Content for SubscribeNewsletter documents
 */
interface SubscribenewsletterDocumentData {
  /**
   * Header field in *SubscribeNewsletter*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.header
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  header: prismic.KeyTextField;

  /**
   * Description field in *SubscribeNewsletter*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * FormInputs field in *SubscribeNewsletter*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.forminputs[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  forminputs: prismic.GroupField<
    Simplify<SubscribenewsletterDocumentDataForminputsItem>
  >;

  /**
   * Segmentations field in *SubscribeNewsletter*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.segmentations[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  segmentations: prismic.GroupField<
    Simplify<SubscribenewsletterDocumentDataSegmentationsItem>
  >;

  /**
   * CTA Label field in *SubscribeNewsletter*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.cta_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  cta_label: prismic.KeyTextField;

  /**
   * Footnote field in *SubscribeNewsletter*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: subscribenewsletter.footnote
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  footnote: prismic.RichTextField;
}

/**
 * SubscribeNewsletter document from Prismic
 *
 * - **API ID**: `subscribenewsletter`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SubscribenewsletterDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<SubscribenewsletterDocumentData>,
    "subscribenewsletter",
    Lang
  >;

export type AllDocumentTypes = FoliopageDocument | SubscribenewsletterDocument;

/**
 * Primary content in *HeaderWithText → Default → Primary*
 */
export interface HeaderWithTextSliceDefaultPrimary {
  /**
   * Header field in *HeaderWithText → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: header_with_text.default.primary.header
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  header: prismic.KeyTextField;

  /**
   * Text Description field in *HeaderWithText → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: header_with_text.default.primary.text_description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text_description: prismic.RichTextField;
}

/**
 * Default variation for HeaderWithText Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeaderWithTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeaderWithTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *HeaderWithText*
 */
type HeaderWithTextSliceVariation = HeaderWithTextSliceDefault;

/**
 * HeaderWithText Shared Slice
 *
 * - **API ID**: `header_with_text`
 * - **Description**: HeaderWithText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeaderWithTextSlice = prismic.SharedSlice<
  "header_with_text",
  HeaderWithTextSliceVariation
>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * HeroImage field in *Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.heroimage
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  heroimage: prismic.ImageField<never>;

  /**
   * Header field in *Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.header
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  header: prismic.RichTextField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *LogoBanner → Default → Primary*
 */
export interface LogoBannerSliceDefaultPrimary {
  /**
   * logo field in *LogoBanner → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: logo_banner.default.primary.logo
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;
}

/**
 * Default variation for LogoBanner Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type LogoBannerSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<LogoBannerSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *LogoBanner*
 */
type LogoBannerSliceVariation = LogoBannerSliceDefault;

/**
 * LogoBanner Shared Slice
 *
 * - **API ID**: `logo_banner`
 * - **Description**: LogoBanner
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type LogoBannerSlice = prismic.SharedSlice<
  "logo_banner",
  LogoBannerSliceVariation
>;

/**
 * Item in *SocialMediasBlock → Default → Primary → SocialMedia*
 */
export interface SocialMediasBlockSliceDefaultPrimarySocialmediaItem {
  /**
   * Label field in *SocialMediasBlock → Default → Primary → SocialMedia*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: social_medias_block.default.primary.socialmedia[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;

  /**
   * Link field in *SocialMediasBlock → Default → Primary → SocialMedia*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: social_medias_block.default.primary.socialmedia[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

  /**
   * Icon field in *SocialMediasBlock → Default → Primary → SocialMedia*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: social_medias_block.default.primary.socialmedia[].icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  icon: prismic.ImageField<never>;
}

/**
 * Primary content in *SocialMediasBlock → Default → Primary*
 */
export interface SocialMediasBlockSliceDefaultPrimary {
  /**
   * SocialMedia field in *SocialMediasBlock → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: social_medias_block.default.primary.socialmedia[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  socialmedia: prismic.GroupField<
    Simplify<SocialMediasBlockSliceDefaultPrimarySocialmediaItem>
  >;
}

/**
 * Default variation for SocialMediasBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SocialMediasBlockSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SocialMediasBlockSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *SocialMediasBlock*
 */
type SocialMediasBlockSliceVariation = SocialMediasBlockSliceDefault;

/**
 * SocialMediasBlock Shared Slice
 *
 * - **API ID**: `social_medias_block`
 * - **Description**: SocialMediasBlock
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SocialMediasBlockSlice = prismic.SharedSlice<
  "social_medias_block",
  SocialMediasBlockSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      FoliopageDocument,
      FoliopageDocumentData,
      FoliopageDocumentDataSlicesSlice,
      SubscribenewsletterDocument,
      SubscribenewsletterDocumentData,
      SubscribenewsletterDocumentDataForminputsItem,
      SubscribenewsletterDocumentDataSegmentationsItem,
      AllDocumentTypes,
      HeaderWithTextSlice,
      HeaderWithTextSliceDefaultPrimary,
      HeaderWithTextSliceVariation,
      HeaderWithTextSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      LogoBannerSlice,
      LogoBannerSliceDefaultPrimary,
      LogoBannerSliceVariation,
      LogoBannerSliceDefault,
      SocialMediasBlockSlice,
      SocialMediasBlockSliceDefaultPrimarySocialmediaItem,
      SocialMediasBlockSliceDefaultPrimary,
      SocialMediasBlockSliceVariation,
      SocialMediasBlockSliceDefault,
    };
  }
}
