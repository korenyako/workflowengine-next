// src/lib/bir1706.ts
export const bir1706Json = `
{
  "version": "1",
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "hdr_title",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Capital Gains Tax Return — BIR Form No. 1706"
          },
          "headerSize": {
            "value": "h5"
          }
        }
      },
      {
        "key": "lbl_subtitle",
        "type": "RsLabel",
        "props": {
          "text": {
            "value": "For Onerous Transfer of Real Property Classified as Capital Asset (both taxable and exempt)"
          }
        }
      },
      {
        "key": "row_dln",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "dln",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "DLN (to be filled by the BIR)"
              }
            }
          }
        ]
      },
      {
        "key": "row_meta",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "date_of_transaction",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date of Transaction (MM/DD/YYYY)"
              }
            },
            "schema": {
              "validations": [
                {
                  "key": "required"
                }
              ],
              "autoValidate": true
            }
          },
          {
            "key": "amended_return",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Amended Return?"
              },
              "items": {
                "value": [
                  { "label": "Yes", "value": "yes" },
                  { "label": "No", "value": "no" }
                ]
              }
            }
          },
          {
            "key": "num_sheets",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "No. of Sheets Attached"
              }
            }
          },
          {
            "key": "atc",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "ATC"
              }
            }
          },
          {
            "key": "taxpayer_type",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Taxpayer Type"
              },
              "items": {
                "value": [
                  { "label": "Individual", "value": "individual" },
                  { "label": "Corporation", "value": "corporation" }
                ]
              }
            }
          }
        ]
      },

      {
        "key": "hdr_part1",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Part I — Background Information"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },

      {
        "key": "row_seller",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "seller_tin",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Seller TIN"
              }
            }
          },
          {
            "key": "seller_name",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Seller's Name (Last, First, Middle)"
              }
            }
          },
          {
            "key": "seller_rdo",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Seller RDO Code"
              }
            }
          }
        ]
      },
      {
        "key": "row_buyer",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "buyer_tin",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Buyer TIN"
              }
            }
          },
          {
            "key": "buyer_name",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Buyer's Name (Last, First, Middle)"
              }
            }
          },
          {
            "key": "buyer_rdo",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Buyer RDO Code"
              }
            }
          }
        ]
      },
      {
        "key": "seller_registered_address",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Seller's Registered Address"
          }
        }
      },
      {
        "key": "buyer_registered_address",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Buyer's Registered Address"
          }
        }
      },
      {
        "key": "seller_residence_address",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Seller's Residence Address (if individual)"
          }
        }
      },
      {
        "key": "location_of_property",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Location of Property"
          }
        }
      },

      {
        "key": "row_classification",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "classification",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Classification of Property"
              },
              "items": {
                "value": [
                  { "label": "Residential", "value": "residential" },
                  { "label": "Commercial", "value": "commercial" },
                  { "label": "Condominium Residential", "value": "condo_residential" },
                  { "label": "Agricultural", "value": "agricultural" },
                  { "label": "Industrial", "value": "industrial" },
                  { "label": "Condominium Commercial", "value": "condo_commercial" },
                  { "label": "Others (specify)", "value": "others" }
                ]
              }
            }
          },
          {
            "key": "classification_others",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "If Others, specify"
              }
            },
            "renderWhen": {
              "value": "form.data.classification === 'others'"
            }
          }
        ]
      },

      {
        "key": "row_area_taxdecl",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "area_sqm",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Area sold (sq.m.)"
              }
            }
          },
          {
            "key": "tax_declaration_no",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Tax Declaration No."
              }
            }
          }
        ]
      },
      {
        "key": "brief_description",
        "type": "RsTextArea",
        "props": {
          "label": {
            "value": "Brief Description of the Property"
          },
          "rows": {
            "value": 3
          }
        }
      },
      {
        "key": "tct_oct_cct_no",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "TCT/OCT/CCT No."
          }
        }
      },

      {
        "key": "row_q17_q18",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "q17_principal_residence",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Is the property being sold your principal residence? (For individual sellers only)"
              },
              "items": {
                "value": [
                  { "label": "Yes", "value": "yes" },
                  { "label": "No", "value": "no" }
                ]
              }
            }
          },
          {
            "key": "q18_new_residence",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Do you intend to construct or acquire a new principal residence within 18 months from the date of disposition/sale? (For individual)"
              },
              "items": {
                "value": [
                  { "label": "Yes", "value": "yes" },
                  { "label": "No", "value": "no" }
                ]
              }
            }
          }
        ]
      },
      {
        "key": "row_q19_q20",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "q19_more_than_one",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Does the selling price cover more than one property?"
              },
              "items": {
                "value": [
                  { "label": "Yes", "value": "yes" },
                  { "label": "No", "value": "no" }
                ]
              }
            }
          },
          {
            "key": "q20_tax_relief",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Are you availing of tax relief under an International Tax Treaty or Special Law?"
              },
              "items": {
                "value": [
                  { "label": "Yes", "value": "yes" },
                  { "label": "No", "value": "no" }
                ]
              }
            }
          },
          {
            "key": "q20_specify",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "If Yes, specify"
              }
            },
            "renderWhen": {
              "value": "form.data.q20_tax_relief === 'yes'"
            }
          }
        ]
      },

      {
        "key": "row_desc_transaction",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "transaction_type",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "Description of Transaction (mark one only)"
              },
              "items": {
                "value": [
                  { "label": "Cash Sale", "value": "cash_sale" },
                  { "label": "Installment Sale", "value": "installment_sale" },
                  { "label": "Exchange", "value": "exchange" },
                  { "label": "Exempt", "value": "exempt" },
                  { "label": "Foreclosure Sale", "value": "foreclosure_sale" },
                  { "label": "Others", "value": "others" }
                ]
              }
            }
          },
          {
            "key": "transaction_other_text",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "If Others, specify"
              }
            },
            "renderWhen": {
              "value": "form.data.transaction_type === 'others'"
            }
          },
          {
            "key": "transaction_exempt_text",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "If Exempt, specify"
              }
            },
            "renderWhen": {
              "value": "form.data.transaction_type === 'exempt'"
            }
          }
        ]
      },

      {
        "key": "installment_block",
        "type": "RsContainer",
        "props": {},
        "renderWhen": {
          "value": "form.data.transaction_type === 'installment_sale'"
        },
        "children": [
          {
            "key": "hdr_installment",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "For Installment Sale:"
              }
            }
          },
          {
            "key": "inst_row1",
            "type": "RsContainer",
            "props": {},
            "css": {
              "any": {
                "object": {
                  "flexDirection": "row",
                  "gap": "16px"
                }
              }
            },
            "children": [
              {
                "key": "selling_price",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "Selling Price"
                  }
                }
              },
              {
                "key": "cost_and_expenses",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "Cost and Expenses"
                  }
                }
              },
              {
                "key": "mortgage_assumed",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "Mortgage Assumed"
                  }
                }
              }
            ]
          },
          {
            "key": "inst_row2",
            "type": "RsContainer",
            "props": {},
            "css": {
              "any": {
                "object": {
                  "flexDirection": "row",
                  "gap": "16px"
                }
              }
            },
            "children": [
              {
                "key": "total_payments_initial_year",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "Total Payments (Collection) During the Initial Year"
                  }
                }
              },
              {
                "key": "num_installments",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "No. of Installments in the Contract"
                  }
                }
              },
              {
                "key": "amount_periodic_payment",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "Amount of Periodic Payment (Collection)"
                  }
                }
              },
              {
                "key": "date_installment_contract",
                "type": "RsDatePicker",
                "props": {
                  "label": {
                    "value": "Date of installment in the Contract"
                  }
                }
              }
            ]
          }
        ]
      },

      {
        "key": "hdr_fmv",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "29 — Fair Market Value (FMV) — Valuation at the time of Contract"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },
      {
        "key": "row_fmv1",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "fmv_land_tax_decl",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "29A — FMV of Land per latest Tax Declaration"
              }
            }
          },
          {
            "key": "fmv_improvements_tax_decl",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "29B — FMV of Improvements per latest Tax Declaration"
              }
            }
          }
        ]
      },
      {
        "key": "row_fmv2",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "fmv_land_bir",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "29C — FMV of Land as determined by BIR Commissioner (zonal value)"
              }
            }
          },
          {
            "key": "fmv_improvements_bir",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "29D — FMV of Improvements as determined by BIR Commissioner"
              }
            }
          }
        ]
      },

      {
        "key": "hdr_taxable_base",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "30 — Determination of Taxable Base"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },
      {
        "key": "row_tb1",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "gross_selling_price_30A",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30A — Gross Selling Price"
              }
            }
          },
          {
            "key": "bid_price_foreclosure_30B",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30B — Bid Price (For Foreclosure Sale)"
              }
            },
            "renderWhen": {
              "value": "form.data.transaction_type === 'foreclosure_sale'"
            }
          }
        ]
      },
      {
        "key": "row_tb2",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "fmv_land_improvements_30C",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30C — Fair Market Value of Land and Improvements"
              }
            }
          },
          {
            "key": "installment_portion_30D",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30D — Installment Portion of Sales Proceeds"
              }
            }
          },
          {
            "key": "taxable_installment_collected_30E",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30E — Taxable Installment Collected (excluding interest)"
              }
            }
          },
          {
            "key": "others_30F",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "30F — Others (specify)"
              }
            }
          }
        ]
      },

      {
        "key": "hdr_part2",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Part II — Computation of Tax"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },
      {
        "key": "row_comp1",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "taxable_base_31",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "31 — Taxable Base"
              }
            }
          },
          {
            "key": "tax_due_32",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "32 — 6% Tax Due"
              }
            }
          }
        ]
      },
      {
        "key": "row_comp2",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "less_tax_prev_paid_33",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "33 — Less: Tax Paid in Return Previously Filed (if amended return)"
              }
            }
          },
          {
            "key": "tax_payable_or_overpayment_34",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "34 — Tax Payable / (Overpayment)"
              }
            }
          }
        ]
      },
      {
        "key": "row_penalties",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "lbl_penalties",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "35 — Add: Penalties"
              }
            }
          },
          {
            "key": "penalties_row",
            "type": "RsContainer",
            "props": {},
            "css": {
              "any": {
                "object": {
                  "flexDirection": "row",
                  "gap": "16px"
                }
              }
            },
            "children": [
              {
                "key": "surcharge_35A",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "35A — Surcharge"
                  }
                }
              },
              {
                "key": "interest_35B",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "35B — Interest"
                  }
                }
              },
              {
                "key": "compromise_35C",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "35C — Compromise"
                  }
                }
              },
              {
                "key": "total_penalties_35D",
                "type": "RsInput",
                "props": {
                  "label": {
                    "value": "35D — Total Penalties"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "key": "row_total36",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "total_amount_payable_36",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "36 — Total Amount Payable / (Overpayment)"
              }
            }
          },
          {
            "key": "overpayment_option",
            "type": "RsRadioGroup",
            "props": {
              "label": {
                "value": "If Overpayment, mark one box only"
              },
              "items": {
                "value": [
                  { "label": "To be Refunded", "value": "refund" },
                  { "label": "To be Issued a Tax Credit Certificate", "value": "tcc" }
                ]
              }
            }
          }
        ]
      },

      {
        "key": "hdr_cert",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Declaration and Certification"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },
      {
        "key": "lbl_cert_text",
        "type": "RsLabel",
        "props": {
          "text": {
            "value": "I declare, under the penalties of perjury, that this return has been made in good faith, verified by me, and to the best of my knowledge and belief, is true and correct, pursuant to the provisions of the National Internal Revenue Code, as amended, and the regulations issued under authority thereof."
          }
        }
      },
      {
        "key": "row_sign",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "signature",
            "type": "RsSignature",
            "props": {}
          },
          {
            "key": "printed_name_37",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Taxpayer/Authorized Agent — Printed Name"
              }
            }
          },
          {
            "key": "title_position_38",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Title/Position of Signatory"
              }
            }
          },
          {
            "key": "date_signed",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date Signed"
              }
            }
          }
        ]
      },

      {
        "key": "hdr_part3",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Part III — Details of Payment"
          },
          "headerSize": {
            "value": "h6"
          }
        }
      },
      {
        "key": "payment_row_39",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "p39_particulars",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "39 — Cash/Bank"
              }
            }
          },
          {
            "key": "p39_drawee",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Drawee Bank / Agency"
              }
            }
          },
          {
            "key": "p39_number",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Number"
              }
            }
          },
          {
            "key": "p39_date",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date (MM/DD/YYYY)"
              }
            }
          },
          {
            "key": "p39_amount",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          }
        ]
      },
      {
        "key": "payment_row_40",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "p40_particulars",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "40 — Check"
              }
            }
          },
          {
            "key": "p40_drawee",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Drawee Bank / Agency"
              }
            }
          },
          {
            "key": "p40_number",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Number"
              }
            }
          },
          {
            "key": "p40_date",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date (MM/DD/YYYY)"
              }
            }
          },
          {
            "key": "p40_amount",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          }
        ]
      },
      {
        "key": "payment_row_41",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "p41_particulars",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "41 — Tax Debit Memo"
              }
            }
          },
          {
            "key": "p41_agency",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Agency"
              }
            }
          },
          {
            "key": "p41_number",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Number"
              }
            }
          },
          {
            "key": "p41_date",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date (MM/DD/YYYY)"
              }
            }
          },
          {
            "key": "p41_amount",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          }
        ]
      },
      {
        "key": "payment_row_42",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row",
              "gap": "16px"
            }
          }
        },
        "children": [
          {
            "key": "p42_particulars",
            "type": "RsLabel",
            "props": {
              "text": {
                "value": "42 — Others"
              }
            }
          },
          {
            "key": "p42_specify",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Specify"
              }
            }
          },
          {
            "key": "p42_number",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Number"
              }
            }
          },
          {
            "key": "p42_date",
            "type": "RsDatePicker",
            "props": {
              "label": {
                "value": "Date (MM/DD/YYYY)"
              }
            }
          },
          {
            "key": "p42_amount",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          }
        ]
      },
      {
        "key": "machine_validation",
        "type": "RsTextArea",
        "props": {
          "label": {
            "value": "Machine Validation / Revenue Official Receipt Details (if not filed with the bank)"
          },
          "rows": {
            "value": 3
          }
        }
      }
    ]
  },
  "localization": {},
  "languages": ["en"],
  "defaultLanguage": "en"
}
`;
